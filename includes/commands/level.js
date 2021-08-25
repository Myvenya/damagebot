const { Permissions, MessageEmbed, DiscordAPIError, MessageAttachment } = require("discord.js");
const Levels = require('discord-xp')
const canvacord = require('canvacord');


module.exports = {
  name: "level",
  description: "Shows the users level",
  execute: async(client, message) => {

      const target = message.mentions.members.first() || message.author;
      const user = await Levels.fetch(target.id, message.guild.id, true);
      const neededXP = Levels.xpFor(parseInt(user.level) + 1);

      if (!user) return message.reply(`You haven't earned any XP yet, try to send some messages first.`);

      const levels = new canvacord.Rank()
      .setAvatar(target.displayAvatarURL({ dynamic: true, format: 'png' }))
      .setCurrentXP(user.xp)
      .setLevel(user.level)
      .setRank(user.position)
      .setRequiredXP(neededXP)
      .setStatus(message.member.presence.status)
      .setProgressBar('#FFA500', 'COLOR')
      .setUsername(target.username)
      .setDiscriminator(target.discriminator)
      levels.build()
        .then(data => {
            const attatchment = new MessageAttachment(data, 'funny.png')
            message.channel.send({ files: [attatchment] });
        })
  },
}