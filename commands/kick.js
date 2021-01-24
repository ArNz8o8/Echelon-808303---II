module.exports = {
	name: 'kick',
	description: 'Kick a member via their ID, so yeah.. right click on le name and copy id.',
	execute(message, args) {
		if (!message.member.hasPermission('KICK_MEMBERS'))
		return messsage.reply('you are not allowed to do that..');
	  if (args.length === 0)
		return message.reply('I do need an ID to do that.. so like, right click on le name and copy id');
	  const member = message.guild.members.cache.get(args[0]);
	  if (member) {
		member
		  .kick('because you just suck')
		  .then((member) => message.channel.send(`Noice, that loser ${member} was kicked successfully, bye Felicia`))
		  .catch((err) => message.channel.send('wh00pz, I cannot kick that user'));
	  } else {
		message.channel.send('I treally have no idea who you are talking about, you l4m3r.. did not use the ID?');
	  }

	},
};