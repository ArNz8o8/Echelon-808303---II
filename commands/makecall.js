// Coding done by ArNz8o8
// January 5th 2021

const {
	prefix,
	token,
} = require('../config.json');
const axios = require('axios');
const Discord = require("discord.js");
const querystring = require('querystring');

module.exports = {
	name: 'makecall',
	description: 'Yeah.. this is for testing purposes only.',
	execute(message, args, client) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.reply("you are not allowed to do that.. haha"); {

			var data = JSON.stringify({
				"request": "" + args.join(" "),
				"briefDescription": "Discord Post Test - IGNORE",
				"category": {
					"name": "Microsoft 365"
				},
				"subcategory": {
					"name": "Overig"
				},
				"callerLookup": {
					"email": "r.saidi@hhs.nl"
				},
				"entryType": {
					"id": "3dcf93d0-cb21-59bd-b9c8-ad270d53fb8d",
					"name": "SelfServiceDesk"
				},
				"callType": {
					"id": "4b8a8c7f-d6ce-5d62-b146-c98ae07b363f",
					"name": "Storing"
				},
				"impact": {
					"id": "56cdcb27-36e9-5e80-83fb-f640bc5ea299",
					"name": "Individu"
				},
				"urgency": {
					"id": "4961bf56-6e66-5add-9171-af2eaeab4d2a",
					"name": "Kan werken"
				},
				"duration": {
					"id": "6c3df082-3cef-4806-988b-845c0c016469",
					"name": "5 dagen"
				},
				"priority": {
					"id": "7b11b54a-41fe-518b-94e4-161a9ea8c692",
					"name": "P4"
				},
				"operator": {
					"id": "850092d6-b41e-4329-ae1f-9734c9175821",
					"status": "operator",
					"name": "Saidi, Rani"
				},
				"operatorGroup": {
					"id": "6c3fabd1-2c58-4dee-91d6-42518b225332",
					"name": "Frontoffice FZ&IT"
				}
			});

			const Embed = (
					number,
					name,
					status,
					request) =>

				new Discord.MessageEmbed()
				.setColor('#FF8315')
				.setTitle(`Your call has been made with number: ${number}`)
				.addField(`Name caller:`, `${name}`, true)
				.addField(`Status:`, `${status}`, true)
				.addField(`Description:`, `${request}`, true)

				.setFooter('TOPdesk call create coded by ArNz8o8 🔥', 'https://i.imgur.com/FFUsM4D.png');

			var config = {
				method: 'post',
				url: 'https://hhs.topdesk.net/tas/api/incidents/?caller=b3d873a1-6570-4a9c-b386-e011202b5b96',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Basic YXBpX2FjY291bnQ6b2VieXMtdnR4ZmktaGFpZHgtdTV0c2stdWNkeTI=', 
					'Cookie': '__cfduid=dce9218c3222f306017005c4fabff88531609748140'
				},
				data: data
			};

			axios(config)
				.then(function (response) {

					let apiData = response.data;
					let number = apiData.number;
					let status = apiData.processingStatus.name
					let name = apiData.caller.dynamicName
					let request = apiData.request;
					message.channel.send(Embed(number, name, status, request));


				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}
}