module.exports = {
	name: 'server',
	description: 'Display info about this, ahem, server.',
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};