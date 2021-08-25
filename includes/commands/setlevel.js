const { Permissions, MessageEmbed, DiscordAPIError, MessageAttachment } = require("discord.js");
const Levels = require('discord-xp')
const canvacord = require('canvacord');


module.exports = {
  name: "setlevel",
  description: "Moves the user to a specific level",
  execute: async(client, message, args) => {

    const target = message.mentions.members.first() || message.author
    const author = message.author
    const user = await Levels.fetch(target.id, message.guild.id, true);
    const amount = parseInt(args[0]);

    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

    const newLevel = new MessageEmbed()
    .setTitle('System Message')
    .setDescription(`${target.username}'s level was set to ${amount}.`)
    .setColor("0x36393e")
    .setFooter(`Command executed by ${message.author.username}`, message.author.displayAvatarURL({size: 1024}))
    .setTimestamp()

    Levels.setLevel(target.id, message.guild.id, amount);
    message.channel.send({ embeds: [newLevel] })
  },
}
