const { prefix, version_echelon } = require('../config.json');

module.exports = {
	name: 'version',
	description: 'Displayz the bot info.. really do not know why tho',
	execute(message) {
		message.channel.send(`this bot is made by 8o83o3Designz, version ${version_echelon} \nnothing much, but its something`);
	},
};