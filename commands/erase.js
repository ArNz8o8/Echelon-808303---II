module.exports = {
	name: 'erase',
	description: 'erase up to 99 messages, so ArNz can fiddle with his code and then delete all the crap.. noice',
	execute(message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS'))
		return message.reply("you are not allowed to do that.. haha"); {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number, or did you like forget to enter a number....');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true);
    message.channel.send(`I haz like removed ${args[0]} line(s) for you.. clean af 🦄`).then(msg => {msg.delete({ timeout: 5000 })
   	 })
    }}
  }
