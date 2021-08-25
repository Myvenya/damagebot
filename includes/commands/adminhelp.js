const { Permissions, MessageEmbed } = require("discord.js");
const config = require('/LycBot/config/config.json')
const prefix = config.PREFIX

module.exports = {
  name: "adminhelp",
  description: "Shows all the avaliable administrator commands",
  
  execute: async (client, message) => {

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

        const admincommands = new MessageEmbed()
        .setTitle('__Administrator Commands__')
        .setColor(0x36393e)
        .addField(`**Announce**`, `usage: ${prefix}anounce <message>.`)
        .addField(`**Introductions Page**`, `usage: ${prefix}introduction. (FOR USE ON THE INTRODUCTIONS PAGE ONLY)`)
        .addField(`**Purge Messages**`, `usage: ${prefix}purge <2-99>`)
        .addField('**Rules List**', `usage: ${prefix}rules. (FOR USE ON THE RULEPAGE ONLY)`)
        .addField('**User Information**', `usage ${prefix}userinfo <mention user>`)
        .setTimestamp()

        const moderatorcommands = new MessageEmbed()
        .setTitle('__Moderator Commands__')
        .setColor(0x36393e)
        .addField(`**Kick**`, `usage: ${prefix}kick <mentioned user>.`)
        .addField(`**Polls**`, `usage: ${prefix}poll <content>.`)
        .addField(`**Purge**`, `usage: ${prefix}purge <2-99>.`)
        .addField(`**Give Warning**`, `usage: ${prefix}warn <mentioned user> <reason>.`)
        .setTimestamp()

        const membercommands = new MessageEmbed()
        .setTitle('__User Commands__')
        .setColor(0x36393e)
        .addField('**Suggest**', `usage: ${prefix}suggest <suggestion>. - Can only be used in the suggestions channel.`)
        .addField('**Meme**', `usage: ${prefix}meme. - Sends a meme from a random source.`)
        .setTimestamp()

        message.channel.send({ embeds: [admincommands, moderatorcommands, membercommands] })
    },
}