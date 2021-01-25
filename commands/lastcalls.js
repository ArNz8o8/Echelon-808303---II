// Coding done by ArNz8o8
// January 7th 2021

const {
	prefix,
	token,
} = require('../config.json');
const axios = require('axios');
const Discord = require("discord.js");
const querystring = require('querystring');
const topdesk_auth = require('../config.json');
const authapi = topdesk_auth.topdesktoken

module.exports = {
	name: 'lastcall',
	description: 'This will show the last call made in TOPdesk.',
	execute(message, args, client) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.reply("you are not allowed to do that.. haha"); {
				const Embed = (
					number,
					name,
					status,
					modifier,
					request) =>

				new Discord.MessageEmbed()
				.setColor('#FF8315')
				.setTitle(`The last TOPDesk call is: ${number}`)
				.addField(`Name caller:`, `${name}`, true)
				.addField(`Status:`, `${status}`, true)
				.addField(`Modified by:`, `${modifier}`, true)
				.addField(`Description:`, `${request}`, true)

				.setFooter('TOPdesk last call lookup by ArNz8o8 🔥', 'https://i.imgur.com/FFUsM4D.png');
				var axios = require('axios');
				
				var config = {
				  method: 'get',
				  url: 'https://hhs.topdesk.net/tas/api/incidents?page_size=1&order_by=call_date+DESC',
				  headers: { 
					'Authorization': `${authapi}`, 
					'Cookie': '__cfduid=dce9218c3222f306017005c4fabff88531609748140'
				  }
				};
				
				axios(config)
				.then(function (response) {

					let apiData = (response.data[0]);
					let number = apiData.number;
					let status = apiData.processingStatus.name
					let name = apiData.caller.dynamicName
					let modifier = apiData.modifier.name
					let request = apiData.request;
					message.channel.send(Embed(number, name, status, modifier, request));


				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
}
