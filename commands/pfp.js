module.exports = {
	name: 'pfp',
	description: 'Get that profile picture of any user, for you know... research purposes.',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your profile pic: ${message.author.displayAvatarURL({ format: "png", dynamic: true })}`);
		}

		const pfpList = message.mentions.users.map(user => {
			return `${user.username}'s profile pic: ${user.displayAvatarURL({ dynamic: true })}`;
		});

		message.channel.send(pfpList);
	},
};