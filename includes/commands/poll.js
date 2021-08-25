const { MessageEmbed, Permissions } = require("discord.js")


module.exports = {
  name: "poll",
  description: "Post a poll with a yes or no",
  execute(client, message, args) {
    
    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return

    if(!args.length) {
      return;
    }
    let member = message.mentions.users.first() || message.author
    let channel = message.guild.channels.cache.get("862204428060721172")

    
    if(!channel) {
      return message.channel.send("I can't find a channel with that name.")
    }
                                                    
    
    let embed = new MessageEmbed()
    .setAuthor(`${message.guild.name} | Poll`)
    .setColor("#ff2050")
    .setDescription(args.join(" "))
    .setFooter(`Poll by ${message.author.username}`, message.author.displayAvatarURL({size: 1024}))
    .setTimestamp()

    channel.send({ embeds: [embed] }).then(m => {
      m.react("✅")
      m.react("❌")
    
    })
  }
}