module.exports = (client) => {
	
	const channelID = '787809339976056865'
	
	client.on('guildMemberAdd', (member) => {
		console.log(member)
		
		const message = `Welcome <@${member.id}> to Echelon.. stay cool.. Please see !info for bot stuff`
		const channel = member.guild.channels.cache.get(channelID)
		channel.send(message)
	})
}