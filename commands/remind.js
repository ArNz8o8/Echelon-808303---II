// Reminder for Echelon 808303
// Coded by ArNz8o8 on feb 14th 2021
const Discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")

module.exports = {
	name: "remind",
	aliases: ["todo"],
	category: "info",
	description: "Add yourself a reminder",
	usage: "<time> <reminder>",
	execute: async (message, args, client) => {

		let timeuser = args[0]
		let reason = args.slice(1).join(" ")


		if (!timeuser) return message.channel.send("Come on man, you should enter le time, like 10m or 10d")
		if (!reason) return message.channel.send("Sure.. don't enter the thing you need to be reminded of")

		db.set(`remind.${message.author.id}`, Date.now() + ms(timeuser))
		message.channel.send(`consider it done, imma remind you of \`${reason}\` in about \`${timeuser}\`, because I am cool like that`)
		const interval = setInterval(function() {


			if (Date.now() > db.fetch(`remind.${message.author.id}`)) {
				db.delete(`remind.${message.author.id}`)
				message.channel.send(`**Dementia reminder:** ${reason}`)
					.catch(e => console.log(e))
				clearInterval(interval)
			}

		}, 1000)
	}
}
