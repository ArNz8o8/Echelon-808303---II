module.exports = {
	name: 'ban',
	description: 'Ban a member via their ID, so yeah.. right click on le name and copy id.',
	execute(message, args) {
	
		if (!message.member.hasPermission('BAN_MEMBERS'))
		return message.reply("you are not allowed to do that..");
	  if (args.length === 0) return message.reply("I do need an ID to do that.. so like, right click on le name and copy id");
	  try {
		const user = message.guild.members.ban(args[0]);
		message.channel.send('Noice, that loser was banned successfully, bye Felicia');
	  } catch (err) {
		console.log(err);
		message.channel.send('Cannot execute. Most likely I haz no have permissions or, you know, the user was not found');
	  }
  },
};