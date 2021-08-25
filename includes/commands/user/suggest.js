const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Send your Suggestion",
  category: "main",
  run: (client, message, args) => {
    

    if(!args.length) {
      return;
    }
    let member = message.mentions.users.first() || message.author
    let channel = message.guild.channels.cache.find((x) => (x.name === "name-suggestions"))
    
    
    if(!channel) {
      return message.channel.send("I can't find a channel with that name.")
    }
                                                    
    
    let embed = new MessageEmbed()
    .setAuthor("Suggestion from: " + message.author.tag, message.author.avatarURL())
    .setThumbnail(message.author.avatarURL())
    .setColor("#ff2050")
    .setDescription(args.join(" "))
    .setTimestamp()

    //message.channel.bulkDelete(1, true)
    channel.send(embed).then(m => {
      m.react("✅")
      m.react("❌")
    
    })
    

    
    client.channels.cache.get('862719714358329364').send(`There's a new suggestion in <#862536945128046604>.`);
    
  }
}