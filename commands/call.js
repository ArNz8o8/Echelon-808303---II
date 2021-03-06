// Coding done by ArNz8o8
// January 5th 2021
const {
	prefix,
	token
} = require('../config.json');
const axios = require('axios');
const Discord = require("discord.js");
const querystring = require('querystring');
const topdesk_auth = require('../config.json');
const authapi = topdesk_auth.topdesktoken
var data = '';

module.exports = {
	name: 'call',
	description: 'Find a call in TOPdesk with !call ixxxx xxxx',
	execute(message, args, client) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.reply("you are not allowed to do that.. haha");
		if (!args.length) {
			return message.channel.send(`Come on man, it is \`!call i<xxxx> <xxxx>\``);
		} else {
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
				.addField(`Description:`, `${request}`, true)
				.setFooter('TOPdesk call lookup coded by ArNz8o8 🔥', 'https://i.imgur.com/FFUsM4D.png');


			var config = {
				method: 'get',
				url: 'https://hhs.topdesk.net/tas/api/incidents/number/' + args.join(" "),
				headers: {
					'Authorization': `${authapi}`,
					'Cookie': '__cfduid=dce9218c3222f306017005c4fabff88531609748140'
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
					let request = apiData.request;
					message.channel.send(Embed(number, name, status, description, request));


				})
				.catch(error => {
					message.channel.send(`I am sorry snowflake, \`${output}\` is either unknown or just misspelled.. feel free to try again`)
				});
		}
	}
}
