const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    description: '',
    execute: function(member, client) {

        const countChannel = {
            total: "862728706623406150",
            member: "862724822404431872",
            bots: "862724875814436874",
            serverID: "862168199847477288",
        }

        const channel = client.channels.cache.get('862186324810399754')

        if (member.guild.id !== countChannel.serverID) return;

        client.channels.cache.get(countChannel.total).setName(`Total Users: ${member.guild.memberCount}`);
        client.channels.cache.get(countChannel.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
        client.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

        
        if (!channel) return;

        let leaveembed = new MessageEmbed()
            .setAuthor(`Member Left`, client.user.displayAvatarURL())
            .setColor("RED")
            .setDescription(`Someone just left the server - I wonder who it could be..?`) 
            .setTimestamp()
        channel.send({ embeds: [leaveembed] });
    }
}