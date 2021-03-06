module.exports = {
	name: 'nowplay',

	async execute(client, interaction) {
		if (!interaction.member.voice.channelId) return await interaction.reply({ content: "❌ | You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "❌ | You are not in my voice channel!", ephemeral: true });
        const query = interaction.options.get('query').value;
        const queue = client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "❌ | Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();

        const search = await client.player
            .search(query, {
                requestedBy: interaction.user
            })
            .catch(e => console.log(e));

        if (!search || !search.tracks.length) return void interaction.followUp("❌ | No results were found.");

        if (search.playlist) {
            interaction.followUp('❌ | Playlists can\'t be added with /playnow. Please use /play.')

        } else {
            interaction.followUp({ content: `⏱ | Loading your track...` });
            queue.insert(search.tracks[0], 0);
            queue.skip();
            if (!queue.playing) await queue.play();

        }
	},
};