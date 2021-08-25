const { Permissions, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'introduction',
    description: 'Sends the introduction message.',
    execute: async(client, message, args) => {

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return
        const informationEmbed = new MessageEmbed()
        .setAuthor("Introducutions - what is this?", client.user.displayAvatarURL())
        .setDescription(`If you made the decision to join us, you're more than welcome to write something about yourself and introduce yourself to the others.\n\nIf you don't want to introduce yourself, you can ignore this and move on.`)
        .setColor('0x36393e')
        .setTimestamp()

    message.channel.send({ embeds: [informationEmbed] });
    },
}

