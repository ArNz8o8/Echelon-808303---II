// WoW addons for Echelon 808303
// Coded by ArNz8o8 on jan 21st 2021
module.exports = {
    name: 'addons',
    aliases: ["addon", "wut"],
    description: "Check what addons you need for Warcraft",
    cooldown: 5,
    execute(message, client) {

        message.channel.send('Looking for addons on curseforge...').then((msg) => {
            setTimeout(function() {
                msg.edit(`Download these addons:\n\n**Details:** https://www.curseforge.com/wow/addons/details\n**Deadly Boss Mods:** https://www.curseforge.com/wow/addons/deadly-boss-mods\n**World Quest Tracker:** https://www.curseforge.com/wow/addons/world-quest-tracker\n`);
            }, 5000)
        });
    }
}
