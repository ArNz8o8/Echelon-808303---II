module.exports = {
	name: 'usercount',
	description: 'Counts users, members and bot, and puts their totals as voicechannel titles',
	
	execute(client) {

let usercount = {
	  serverID: '787809339976056863',
	  total: "791677442959212554",
	  member: "791677507614801930",
	  bots: "791677577365291039"
	}
	
	client.on('guildMemberAdd', member => {
	  if(member.guild.id !== usercount.serverID) return;
	  client.channels.cache.get(usercount.total).setName(`Total users: ${member.guild.memberCount}`);
	  client.channels.cache.get(usercount.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
	  client.channels.cache.get(usercount.bots).setName(`Botz: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
	})
	
	client.on('guildMemberRemove', member => {
	  if(member.guild.id !== usercount.serverID) return;
	  client.channels.cache.get(usercount.total).setName(`Total users: ${member.guild.memberCount}`);
	  client.channels.cache.get(usercount.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
	  client.channels.cache.get(usercount.bots).setName(`Botz: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
	})
	
	client.on('guildMemberUpdate', member => {
		  if(member.guild.id !== usercount.serverID) return;
		  client.channels.cache.get(usercount.total).setName(`Total users: ${member.guild.memberCount}`);
		  client.channels.cache.get(usercount.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
		  client.channels.cache.get(usercount.bots).setName(`Botz: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
		})
}}