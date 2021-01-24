const { prefix } = require('../config.json');
const Discord = require("discord.js");

module.exports = {
	name: 'info',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		
		if (!args.length) {
		const title = 'Hi! So yeah, my name is Echelon\nand here\'s a list of "all" my commands';
		const description = data.push(commands.map(command => command.name).join(', '));
		const footer = `🔥 Brought to you by ArNz8o8`;
		const infoEmbed = new Discord.MessageEmbed()
		.setColor('#FF8315')
		.setTitle(title)
		.setDescription(data)
		.setThumbnail(`https://i.imgur.com/mhQeaaX.png`)
		.setFooter(footer);
		return message.author.send(infoEmbed)
			.then(() => {
			if (message.channel.type === 'dm') return;
			message.reply('Imma slide into your DM with all of me *wink*').then(msg => {msg.delete({ timeout: 10000 });
				})
	   .catch(error => {
		   console.error(`Could not send info DM to ${message.author.tag}.\n`, error);
		   message.reply('it seems like I can\'t DM you, wtd');
			   });
		 })
			 const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('that\'s not a valid command, lamer');
			}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
		}
  }}