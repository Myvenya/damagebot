const { MessageEmbed } = require("discord.js");
const config = require('/LycBot/config/config.json')
const prefix = config.PREFIX

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    execute: async (client, message) => {

        const members = new MessageEmbed()
        .setTitle('Commandlist')
        .addField('**Suggest**', `usage: ${prefix}suggest <suggestion>. - Can only be used in the suggestions channel.`)
        .addField('**Meme**', `usage: ${prefix}meme. - Sends a meme from a random source.`)
        .setTimestamp()

        message.channel.send({ embeds: [members] });
    },
}