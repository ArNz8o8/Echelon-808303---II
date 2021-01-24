// Coding done by ArNz8o8
// January 5th 2021

const {
	prefix,
	token
} = require('../config.json');
const axios = require('axios');
const Discord = require("discord.js");
const querystring = require('querystring');


module.exports = {
	name: 'sentmsg',
	description: 'Yeah.. this is for testing purposes only.',
	execute(message, args, client) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.reply("you are not allowed to do that.. haha"); {
				
			var data = JSON.stringify({
				"title": "Notification send via Echelon 808303",
				"body": "" + args.join(" "),
				"url": "/tas/secure/mango/window/0?t=1609744838956",
				"operatorIds": ["850092d6-b41e-4329-ae1f-9734c9175821"]
			});

			var config = {
				method: 'post',
				url: 'https://hhs.topdesk.net/tas/api/tasknotifications/custom',
				headers: {
					'Accept': 'application/json',
					'Authorization': 'Basic YWFtZGhhcnRvZ0BoaHMubmw6dGtucGctN2hqdHotM2F5eDMtcGNzNWktanZ2NHc=',
					'Content-Type': 'application/json',
					'Cookie': '__cfduid=dce9218c3222f306017005c4fabff88531609748140'
				},
				data: data
			};

			axios(config)
				.then(function (response) {


					message.channel.send(`Le message was succesfully sent`);


				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
}