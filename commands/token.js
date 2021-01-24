// Token Check for Echelon 808303
// Coded by ArNz8o8 on jan 21st 2021

const BlizzAPI = require('blizzapi');
const moment = require('moment');
const Discord = require("discord.js");

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
				clientId: '1991ab0d69674657b487039e01478ee5',
				clientSecret: 'OxvPNjx5dDhYLlQwzca5DxL9Kx34ilRa',
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

