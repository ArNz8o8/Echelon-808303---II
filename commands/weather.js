const {
  prefix,
  token,
  version,
  weathertoken
} = require('../config.json');
const axios = require('axios');
const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
  name: 'weather',
  aliases: ["weer", "temp", "brrr"],
  description: 'Yeah.. so you can check the weather. What a surprise. Use it with weather and then cityname.',
  execute(message, args, client, bot, weather) {

      if (!args.length) {
          return message.reply(`It goes like !weather <cityname>`);
      } else {
          let argz = args[0].toLowerCase();


          const welkeDag = moment();

          const Embed = (
                  temp,
                  maxTemp,
                  feelzTemp,
                  pressure,
                  humidity,
                  wind,
                  overall,
                  stad,
                  icon
              ) =>
              new Discord.MessageEmbed()
              .setColor('#FF8315')
              .setTitle(`For this ${welkeDag.format('dddd')} it is totally like ${temp}\u00B0 C in ${stad}`)
              .addField(`Maximum temp:`, `${maxTemp}\u00B0 C`, true)
              .addField(`Feelz like:`, `${feelzTemp}\u00B0 C`, true)
              .addField(`Wind Speed:`, `${wind} m/s`, true)
              .addField(`Overall weather:`, `${overall}`, true)
              .setThumbnail(`http://openweathermap.org/img/w/${icon}.png`)
              .setFooter('Echelon weather coded by ArNz8o8 🔥', 'https://i.imgur.com/mhQeaaX.png');

          axios
              .get(
                  `http://api.openweathermap.org/data/2.5/weather?q=${args.join(" ")}&units=metric&APPID=${weathertoken}`
              )
              .then(response => {
                  let apiData = response;
                  let currentTemp = Math.ceil(apiData.data.main.temp)
                  let maxTemp = apiData.data.main.temp_max;
                  let feelzTemp = apiData.data.main.feels_like;
                  let humidity = apiData.data.main.humidity;
                  let wind = apiData.data.wind.speed;
                  let icon = apiData.data.weather[0].icon
                  let country = apiData.data.sys.country
                  let stad = args.join(" ")
                  let pressure = apiData.data.main.pressure;
                  let overall = apiData.data.weather[0].description;
                  message.channel.send(Embed(currentTemp, maxTemp, feelzTemp, pressure, humidity, wind, overall, stad, icon));
              }).catch(error => {
                  message.channel.send(`I am sorry snowflake, ${argz} is unknown or just misspelled.. try again`)
              });
      }
  }
}