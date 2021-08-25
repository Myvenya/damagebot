const { Permissions, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Posts an invite link to the server.',
    execute: async(client, message, args) => {

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('invite')
                .setLabel('Send me an invite link')
                .setStyle('PRIMARY'),
        );
        let invite = await message.channel.createInvite(
            {
            maxAge: 86400,
            maxUses: 1
        },
        ).catch(console.log)

        let inviteembed = new MessageEmbed()
        .setDescription(`If you'd like to invite more people to the server, we've prepared you with a copyable link below!`)
        .addField('Invite Link', `${invite}`)
        .setThumbnail('https://cdn.discordapp.com/attachments/864278678719561748/866461555373899776/QR.png')
        .setTimestamp()

        message.channel.send({ embeds: [inviteembed], components: [row] })
    },
}