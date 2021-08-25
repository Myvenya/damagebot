const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    description: '',
    execute: function(member, client) {

        const countChannel = {
            total: "862728706623406150",
            member: "862724822404431872",
            bots: "862724875814436874",
            serverID: "862168199847477288",
        }

        const channel = client.channels.cache.get('862185317573591075')
        const channel2 = client.channels.cache.get('862186324810399754')

        if (member.guild.id !== countChannel.serverID) return;

        client.channels.cache.get(countChannel.total).setName(`Total Users: ${member.guild.memberCount}`);
        client.channels.cache.get(countChannel.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
        client.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

        if (!channel) return;
        
        let welcome = new MessageEmbed()
            .setColor(0x36393e)
            .setDescription(`Greetings ${member} - and welcome to ${member.guild.name}.`)
            .addField(`Why can't I see any channels?`, `You should be able to see the "Welcome" category and there should be a channel named <#862168199847477291>.`)
            .addField(`I don't want to join, I just want to give feedback.`, `That's completely fine, and we have prepared for that. <#868688451896213524>`)
            .addField('I want to talk to one of the moderators.', `If you send a DM to <@862179312614506516> you can chat directly with us through the bot.`)
            .addField('PS:', `If you have any other questions, feel free to DM the bot as well - otherwise we hope that you enjoy your stay in the Ambient Forest.`)
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp()

        let joinembed = new MessageEmbed()
            .setAuthor(`Member Joined`, client.user.displayAvatarURL())
            .setColor("GREEN")
            .setDescription(`${member} just joined the server.`) 
            .setFooter(`ID: ${member.user.id}`)
            .setTimestamp()

        channel.send({ embeds: [welcome] });

        channel2.send({ embeds: [joinembed] });
    }
}