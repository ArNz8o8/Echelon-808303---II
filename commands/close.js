// Coding done by ArNz8o8
// November 8th 2021
const {
	prefix,
	token
} = require('../config.json');
const axios = require('axios');
const Discord = require("discord.js");
const querystring = require('querystring');
const topdesk_auth = require('../config.json');
const authapi = topdesk_auth.topdesktoken

module.exports = {
	name: 'close',
	aliases: [
		"sluit",
		"weg"
	],
	category: "info",
	description: 'Close a call in TOPdesk with !close ixxxx xxxx',
	execute(message, args, client) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.reply("you are not allowed to do that.. haha");
		if (!args.length) {
			return message.channel.send(`Come on man, it is \`!close i<xxxx> <xxxx>\``);
		} else {

	  var data = JSON.stringify({
				"feedbackRating": 5,
				"feedbackMessage": "Call was closed on demand, via discord",
				"action": "Call closed via Echelon - Discord",
				"actionInvisibleForCaller": false,
				"processingStatus": {
					"name": "Gesloten"
				}
			});

			const output = args.join(" ")

			const Embed = (
					number,
					name,
					status,
					description,
					request) =>

				new Discord.MessageEmbed()
				.setColor('#FF8315')
				.setTitle(`Call number ${number}`)
				.addField(`Name caller:`, `${name}`, true)
				.addField(`Subject:`, `${description}`, true)
				.addField(`Status:`, `${status}`)
				.addField(`Action:`, `${request}`, true)
				.setFooter('TOPdesk close a call coded by ArNz8o8 🔥', 'https://i.imgur.com/FFUsM4D.png');

				var config = {
				method: 'patch',
				url: 'https://hhs.topdesk.net/tas/api/incidents/number/' + args.join(" "),
				headers: {
					'Authorization': `${authapi}`,
					'Content-Type': 'application/json'
				},
				data: data
			};

			axios(config)
				.then(function(response) {

					let apiData = response.data;
					let number = apiData.number;
					let name = apiData.caller.dynamicName;
					let status = apiData.processingStatus.name;
					let description = apiData.briefDescription
					let request = apiData.feedbackMessage;
					message.channel.send(Embed(number, name, status, description, request));
				})
				.catch(error => {
					message.channel.send(`I am sorry young padawan, \`${error
		}\` is the error I am getting`)
				});
		}
	}
}
