const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'announce',
    description: 'Sends an announcement to the announcement channel.',
    execute: async(client, message, args) => {

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

        const embed = new MessageEmbed()
            .setAuthor(`Announcement from ${message.guild.name}`, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(args.join(" "))
            .setFooter(`Announced by ${message.author.username}`, message.author.displayAvatarURL({size: 1024}))
            .setTimestamp()

        client.channels.cache.get('862202279632699392').send({ embeds: [embed] });
    },
}