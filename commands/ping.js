// ping module

module.exports = {
	name: 'ping',
	description: 'Ping that server, see how the connection is',
	cooldown: 5,
	execute(message, client) {
    
    message.channel.send('Pinging...').then(sent => {
    sent.edit(`Hey hoser, your ping is somewhat around ${sent.createdTimestamp - message.createdTimestamp}ms, not bad eh`);
    	})
	},
}