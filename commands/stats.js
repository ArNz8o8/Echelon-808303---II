const { version } = require("discord.js");
const config = require('../config.json');
const Discord = require("discord.js");
const moment = require('moment');
const os = require("os");

function timeCon(time) {
	time = time * 1000
	let days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0
	days = Math.floor(time / 86400000)
	time -= days * 86400000
	hours = Math.floor(time / 3600000)
	time -= hours * 3600000
	minutes = Math.floor(time / 60000)
	time -= minutes * 60000
	seconds = Math.floor(time / 1000)
	time -= seconds * 1000
	days = days > 9 ? days : "" + days
	hours = hours > 9 ? hours : "" + hours
	minutes = minutes > 9 ? minutes : "" + minutes
	seconds = seconds > 9 ? seconds : "" + seconds
	return (parseInt(days) > 0 ? days + " days " : "") + (parseInt(hours) === 0 && parseInt(days) === 0 ? "" : hours + " hours ") + minutes + " minutes " + seconds + " seconds."
	}

module.exports = {
  
  name: 'stats',
	description: "Gives some useful bot statistics",
	
	execute (message, client) {

	const createdArNz = moment(message.guild.createdAt).format('MMMM Do YYYY')
	const botVersion = config.version_echelon
	const memusedArNz = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'
	const uptimeArNz = timeCon(process.uptime())
	const osArNz = 'Linux ' + os.release
	const nodejsArNz = 'v ' + version
	const disccArNz = 'v ' + process.version

	const statsEmbed = new Discord.MessageEmbed()
		.setColor('#FF8315')
		.setTitle('Statz for Echelon 808303')
		.addFields	(
					{ name: 'Created', value: createdArNz, inline: true },
		  	  		{ name: 'Echelon version', value: botVersion, inline: true },
					{ name: 'Memory in use:', value: memusedArNz },
		 			{ name: 'Uptime:', value: uptimeArNz },
		  		   	{ name: 'OS:', value: osArNz },
		  			{ name: 'Node.js:', value: nodejsArNz, inline: true },
		  			{ name: 'Discord.js:', value: disccArNz, inline: true },
					)
					.setFooter('Echolon bot brought to you by ArNz8o8 🔥', 'https://i.imgur.com/mhQeaaX.png');  

					message.channel.send(statsEmbed);
	}
};
