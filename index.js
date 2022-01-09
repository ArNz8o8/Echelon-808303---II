// Coding done by ArNz8o8
// Copyright 2022 - 808303Designz
// www.8o8networkz.nl

// Echelon Discord bot - 23 dec 2020 0.1 - First Run
// 24 dec 2020 0.2 - Second Run
// 25 dec 2020 0.3 - Added API query to Weather
// 28 dec 2020 0.4a - Added Urban Dictionary API
// 28 dec 2020 0.4b - Moved API keys to separate file, moved to beta status

// Echelon Discord bot II - 29 dec 2020 1.0 - Totally rewrote the code, using modules now, thanks Rani:)
// 30 dec 2020 1.0a - All running smoothly now, I guess
// 30 dec 2020 1.0b - Fixed Urban Dictionary again
// 31 dec 2020 1.0c - Ready for the year 2021
// 01 jan 2021 1.1a - Re-added the user count
// 02 jan 2021 1.1b - Added Moonphase
// 05 jan 2021 1.1c - Added prototypes for TOPdesk calls
// 06 jan 2021 1.1d - Added find person function via logonname
// 21 jan 2021 1.2a - Added Warcraft Armory Lookup
// 22 jan 2021 1.2b - Fixed moonphase givings wrong results
// 24 jan 2021 1.2f - Cleaned up code - Moving to full release
// 30 jan 2021 1.2g - Clean code some more
// 27 apr 2021 1.4a - Added sunset
// 08 nov 2021 1.5a - Addes close call for TOPdesk
// 09 jan 2022 1.6a - Getting ready for 2022

// Required NPMs to be installed before running this bot:
// "discord.js" because du doi
// "node-fetch" for API
// "axios" for weather
// "querystring" for Urban Dictionary
// "moment-duration-format" for stats
// "moments" for stats
// "cheerio" for moonphase
// "blizzapi" for armory lookup
// "ms" and "quick.db" for remind function

const fs = require('fs');
const Discord = require('discord.js');
const {
	prefix,
	token
} = require('./config.json');
const welcome = require('./modules/welcome.js');
const udsearch = require('./modules/urban.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
process.setMaxListeners(0);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	var channel = client.channels.cache.get('787809339976056865');
	// channel.send("I AM BACK AF! (a.k.a. Echelon 8o83o3 (production) is online, low key sliding into your dm)");
	client.user.setStatus('idle');

	const arnz_state = [
		"World of Warcraft",
		"!info",
		"..or being played?",
		"World of fokkin Warcraft",
		"1.6a rc 2022.jan"
	]
	setInterval(() => {
		const index = Math.floor(Math.random() * (arnz_state.length - 1) + 1);
		client.user.setActivity(arnz_state[index]);
	}, 15000);
	console.log('Echelon logged in, taking names and kicking ass')

	welcome(client)
});

// This is for usercount stats - as names - in voicechannels

let usercount = {
	serverID: '787809339976056863',
	total: "791677442959212554",
	member: "791677507614801930",
	bots: "791677577365291039"
}

client.on('guildMemberAdd', member => {
	if (member.guild.id !== usercount.serverID) return;
	client.channels.cache.get(usercount.total).setName(`Total users: ${member.guild.memberCount}`);
	client.channels.cache.get(usercount.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
	client.channels.cache.get(usercount.bots).setName(`Botz: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
	if (member.guild.id !== usercount.serverID) return;
	client.channels.cache.get(usercount.total).setName(`Total users: ${member.guild.memberCount}`);
	client.channels.cache.get(usercount.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
	client.channels.cache.get(usercount.bots).setName(`Botz: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('guildMemberUpdate', member => {
	if (member.guild.id !== usercount.serverID) return;
	client.channels.cache.get(usercount.total).setName(`Total users: ${member.guild.memberCount}`);
	client.channels.cache.get(usercount.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
	client.channels.cache.get(usercount.bots).setName(`Botz: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
})

client.on('disconnect', () => {
	console.log("Echelon just disconnected, trying to reconnect")
})

client.on('reconnecting', () => {
	console.log("Echelon is reconnecting")
})

// carry on with regular code

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// loading separate modules here 
	udsearch(prefix, args, message, client)
	// add more if you want

	const command = client.commands.get(commandName) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs.. go and be public');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.channel.reply('I bet you think you are really smart..');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, insert coin and try again`;

		if (command.usage) {
			reply += `\nThe proper banter would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Someone call ArNz, I can\'t with these errors.. lame code much');
	}
});

client.login(token);
