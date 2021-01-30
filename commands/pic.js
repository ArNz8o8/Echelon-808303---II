// Armory Check for Echelon 808303
// Coded by ArNz8o8 on jan 21st 2021
const BlizzAPI = require('blizzapi');
const querystring = require('querystring');
const Discord = require("discord.js");
const config = require('../config.json');
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const request = require('request')
const {
    promisify
} = require('util')
const sleep = promisify(setTimeout)

module.exports = {
    name: "pic",
    // aliases: ["wow", "alt", "toon", "warcraft"],
    category: "info",
    description: "Check out your WoW character directly from the Blizzard API",
    usage: "!armory <name> <realm> (realm defaults to Darkmoon Faire, use - instead of spaces)",
    execute: async (message, args, client) => {

        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply("you are not allowed to do that.. haha");
        if (!args.length) {
            return message.reply(`It goes like !armory <name> <realm>`);

        } else {

            let realm = args[1];
            let argz = args[0].toLowerCase();
            if (!realm) realm = "darkmoon-faire"

            const BnetApi = new BlizzAPI({
                region: config.default_region,
                realm: config.default_realm,
                clientId: config.BLIZZARD_API_KEY,
                clientSecret: config.BLIZZARD_API_SECRET,
                refreshExpiredAccessToken: true,
            });
            const character_query = await BnetApi.query(`/profile/wow/character/${realm}/${argz}/character-media?namespace=profile-eu&locale=en_GB`).then((data1) => {
                let picData = data1;
                let toonAvatar
                try {
                    toonAvatar = picData.assets[0].value;
                } catch (error) {
                    toonAvatar = picData.avatar_url;
                }

                var profpic = toonAvatar

                function makeid(length) {
                    var result = '';
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                }

                const rng_name = makeid(5)

                const url = `${profpic}`
                const path = `./commands/images_blizz/${rng_name}.png`

                const download = (url, path, callback) => {
                    request.head(url, (err, res, body) => {
                        request(url)
                            .pipe(Fs.createWriteStream(path))
                            .on('finish', callback)
                    })
                }
                download(url, path, () => {
                    message.channel.send(`Downloading the profile pic for: ${argz}`)
                });
                sleep(2000).then(() => {
                    const attachment = new Discord
                        .MessageAttachment(`./commands/images_blizz/${rng_name}.png`, `${rng_name}.png`);
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`${argz}`)
                        .attachFiles(attachment)
                        .setImage(`attachment://${rng_name}.png`);

                    message.channel.send({
                        embed
                    });
                })
            })
        }
    }
}
