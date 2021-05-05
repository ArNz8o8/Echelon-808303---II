const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "pfp",
    aliases: ["avatar", "profilepic"],
    category: "info",
    description: "Get that profile picture of any user, for you know... research purposes.",
    usage: "!pfp <@username> (if only the command !pfp is used, you get your own avatar",

    execute: async (message, args) => {


        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({
            size: 1024
        })


        const embed = new Discord.MessageEmbed()
            .setTitle(`Here you go, ${member.username}'s avatar`)
            .setImage(avatar)
            .setColor("#FF8315")

            .setFooter('Avatar lookup coded by ArNz8o8 🔥', 'https://i.imgur.com/R56xBE3.png')
        message.channel.send(embed);
    }
}
