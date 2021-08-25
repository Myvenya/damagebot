const { Permissions, MessageEmbed } = require('discord.js')
const config = require('/LycBot/config/config.json')
const prefix = config.PREFIX

module.exports = {
    name: 'moderatorhelp',
    description: 'Posts a list of all the avaliable moderator commands.',
    execute: async(client, message) => {

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return

        const moderatorcommands = new MessageEmbed()
        .setTitle('__Moderator Commands__')
        .setColor(0x36393e)
        .addField(`**Kick**`, `usage: ${prefix}kick <mentioned user>.`)
        .addField(`**Polls**`, `usage: ${prefix}poll <content>.`)
        .addField(`**Purge**`, `usage: ${prefix}purge <2-99>.`)
        .addField(`**Warn**`, `usage: ${prefix}warn <mentioned user> <reason>.`)
        .setTimestamp()

        const membercommands = new MessageEmbed()
        .setTitle('__User Commands__')
        .setColor(0x36393e)
        .addField('**Suggest**', `usage: ${prefix}suggest <suggestion>. - Can only be used in the suggestions channel.`)
        .addField('**Meme**', `usage: ${prefix}meme. - Sends a meme from a random source.`)
        .setTimestamp()

        message.channel.send({ embeds: [moderatorcommands, membercommands] })
    },
}