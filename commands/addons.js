// WoW addons for Echelon 808303
// Coded by ArNz8o8 on jan 24th 2021

module.exports = {
	name: 'addons',
	aliases: ["addon", "wut"],
	description: "Check what addons you need for Warcraft",
	cooldown: 5,
	execute(message, client) {
	
	message.channel.send('Looking for addons on curseforge...').then((msg)=> {
  setTimeout(function(){
	msg.edit(`Download these addons:\n\nDetails : https://www.curseforge.com/wow/addons/details\nDeadly Boss Mods: https://www.curseforge.com/wow/addons/deadly-boss-mods\nWorld Quest Tracker: https://www.curseforge.com/wow/addons/world-quest-tracker`);
		}, 5000)
	},
}
