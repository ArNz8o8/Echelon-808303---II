// Reload module

module.exports = {
	name: 'reload',
	description: 'Reloads a command module, because ArNz needz that reload (and he is the only one who can use it..)',
	args: true,
	execute(message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
		return message.reply("you are not allowed to do that.. haha"); {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`Oh snap, there is no command named \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`That did the trick, le command with the name \`${command.name}\` was reloaded. I am back online`);
		} catch (error) {
			console.error(error);
			message.channel.send(`Dayum, there was an err0r while reloading command \`${command.name}\`:\n\`${error.message}\``);
		}
		}
	},
};