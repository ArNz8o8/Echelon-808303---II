// Calculate Moon Phase by todays Date
// Coding done by ArNz8o8
// Command = <prefix>moon

const moment = require('moment');
const {
	prefix,
	token,
	version,
	weather
} = require('../config.json');
const Discord = require("discord.js");

module.exports = {
	name: 'moon',
	description: 'Yeah.. so you can check le moon phase. This one is for you Rani.',
	execute(message) {


		var Moon = {
			phase: function(year, month, day) {
				var c = e = jd = b = 0;

				if (month < 3) {
					year--;
					month += 12;
				}

				++month;
				c = 365.25 * year;
				e = 30.6 * month;
				jd = c + e + day - 694039.09;
				jd /= 29.5305882;
				b = parseInt(jd);
				jd -= b;
				b = Math.round(jd * 8);

				if (b >= 8) b = 0;

				switch (b) {
					case 0:
						return 'new moon';
						break;
					case 1:
						return 'waxing crescent moon';
						break;
					case 2:
						return 'quarter moon';
						break;
					case 3:
						return 'waxing gibbous moon';
						break;
					case 4:
						return 'full moon';
						break;
					case 5:
						return 'waning gibbous moon';
						break;
					case 6:
						return 'last quarter moon';
						break;
					case 7:
						return 'waning crescent moon';
						break;
				}
			}
		};
		const welkeDag = moment();
		var today = new Date();
		var phase = Moon.phase(today.getFullYear(), today.getMonth(), today.getDate(), today.getTime() +1);
		if (message.author.id === "364757568041779203") {
			message.channel.send(`My sweet ranietjuh, on this ${welkeDag.format('dddd')}, there is a ${phase} tonight`);
		} else {
			message.channel.send(`Well.. hmm, as it is le ${welkeDag.format('dddd')}, there should be a ${phase} tonight`);
		}
	}
}
