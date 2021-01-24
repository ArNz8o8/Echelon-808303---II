const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = async (prefix, args, message, client) => {
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const argz = message.content.slice(prefix.length).trim().split(/ +/);
	const command = argz.shift().toLowerCase();

	if (command === 'urban') {
		
	if (!argz.length) {
		return message.channel.send('Tell me homeslice.. what slang am I looking for eh?');
	}
    const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
	const query = querystring.stringify({ term: argz.join(' ') });
  
	const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
  
	if (!list.length) {
		return message.channel.send(`Le word **${argz.join(' ')}** is not a found, is it even a word?`);
	}
  
	const [answer] = list;
  
	const urbanembed = new Discord.MessageEmbed()
		.setColor('#FF8315')
		.setTitle(answer.word)
		.setURL(answer.permalink)
		.addFields(
			{ name: 'Definition', value: trim(answer.definition, 1024) },
			{ name: 'Example', value: trim(answer.example, 1024) },
			{ name: '\u200B', value: '\u200B' },
		)
		.setFooter('Brought to you by ArNz8o8 🔥', 'https://i.imgur.com/mhQeaaX.png');  
		
	message.channel.send(urbanembed)
	}
}