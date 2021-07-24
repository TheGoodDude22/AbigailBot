const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'map',
    aliases: [],
    category: 'Fun',
	utilisation: '{prefix}map',

    execute(client, message, args) {

		fetch('https://api.mozambiquehe.re/maprotation?version=2&auth=kRcGUSYHry5UthHzscvO')
		.then(res => res.json())
		.then(json => {
			const apiData = json;

			const outputEmbed = new Discord.MessageEmbed()
				.setTitle('Apex Map')
				.addField('**Battle Royale**', `   ${apiData.battle_royale.current.map} with ${apiData.battle_royale.current.remainingTimer} remaining.\nThen ${apiData.battle_royale.next.map} for ${apiData.battle_royale.next.DurationInMinutes} minutes.`)
				.addField('**Arenas**', `   ${apiData.arenas.current.map} with ${apiData.arenas.current.remainingTimer} remaining.\nThen ${apiData.arenas.next.map} for ${apiData.arenas.next.DurationInMinutes} minutes.`)
				.setColor('#0099ff');
			
			message.channel.send(outputEmbed);
		})
	}
};