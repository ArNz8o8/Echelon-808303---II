const { prefix, version_echelon } = require('../config.json');

module.exports = {
	name: 'version',
	description: 'Displayz the bot info.. really do not know why tho',
	execute(message) {
		message.channel.send(`Echelon (\`version ${version_echelon}\`) is made by ArNz8o8 from 8o83o3Designz inc, see ${prefix}stats for moar nerd shizzle`);
	},
};
