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
	name: 'find',
	description: 'Yeah.. this is for finding people and their phonenumbers.',
	execute(message, args, client) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
			return message.reply("you are not allowed to do that.. haha"); {

			const Embed = (
					dynName,
					firstName,
					tussenVoegsel,
					surName,
					eMail,
					werkFunctie,
					phoneNumber,
					kamerNR,
					afdeling) =>

				new Discord.MessageEmbed()
				.setColor('#FF8315')
				.setTitle(`Info about: ${dynName}`)
				.addField(`First name:`, `\u200b${firstName}`, true)
				.addField(`Last name:`, `\u200b${tussenVoegsel}\u200b${surName}`, true)
				.addField(`Phonenumber:`, `\u200b${phoneNumber}`)
				.addField(`Roomnumber:`, `\u200b${kamerNR}`)
				.addField(`E-mail:`, `\u200b${eMail}`, true)
				.addField(`Jobtitle:`, `\u200b${werkFunctie}`)
				.addField(`Department:`, `\u200b${afdeling}`, true)
				.setFooter('Person lookup coded by ArNz8o8 🔥', 'https://i.imgur.com/FFUsM4D.png');

			var config = {
				method: 'get',
				url: 'https://hhs.topdesk.net/tas/api/persons?query=networkLoginName==' + args.join(" ") + '@hhs.nl',
				headers: {
					'Authorization': `${authapi}`,
					'Cookie': '__cfduid=dce9218c3222f306017005c4fabff88531609748140'
				},
				data: data[0]

			};
			axios(config)
				.then(function(response) {

					let apiData = (response.data[0]);
					let dynName = apiData.dynamicName
					let firstName = apiData.firstName
					let tussenVoegsel;
					try {
						tussenVoegsel = apiData.prefixes;
					} catch (error) {
						tussenVoegsel = "";
					};
					let surName = apiData.surName
					let eMail = apiData.email
					let werkFunctie = apiData.jobTitle
					let phoneNumber;
					try {
						phoneNumber = apiData.phoneNumber;
					} catch (error) {
						phoneNumber = "n/a";
					};
					let kamerNR;
					try {
						kamerNR = apiData.location.name;
					} catch (error) {
						kamerNR = "n/a";
					};
					let afdeling = apiData.department.name
					message.channel.send(Embed(dynName, firstName, tussenVoegsel, surName, eMail, werkFunctie, phoneNumber, kamerNR, afdeling));
					// console.log(JSON.stringify(response.data));
				})
				.catch(error => {
					message.channel.send(`I am sorry snowflake, \`${args}\` is either unknown or just misspelled.. feel free to try again`)
				});
		}
	}
}
