// Token Check for Echelon 808303
// Coded by ArNz8o8 on jan 21st 2021

const BlizzAPI = require('blizzapi');
const moment = require('moment');
const Discord = require("discord.js");
const config = require('../config.json');

module.exports = {
	name: "token",
	aliases: ["gold", "wowtoken"],
	category: "info",
	description: "Check out the latest live token price from EU servers",
	usage: "!token",
	execute: async (message, client) => {

				const welkeDag = moment();
				
				const BnetApi = new BlizzAPI({
				region: 'eu',
				clientId: config.BLIZZARD_API_KEY,
				clientSecret: config.BLIZZARD_API_SECRET,
				refreshExpiredAccessToken: true,
			});

			const token_query = await BnetApi.query(`/data/wow/token/index?namespace=dynamic-eu&locale=en_GB`).then((data) => {

					let tokenData = data;
					let tokenPrice = tokenData.price;
		  			let tokenTimestamp = tokenData.lastModified

		  var d = tokenPrice/10000

		  message.channel.send(`On this ${welkeDag.format('dddd')}, the WoW token price on Darkmoon Faire (EU) is **${d} gold**`)
			  // console.log(token_query);
			  })
			  }
}

