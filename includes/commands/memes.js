const randomPuppy = require('random-puppy');
const Discord = require('discord.js')

module.exports = {
    name: "memes",
    description: "Gives you a meme",
    execute: async(message) => { 
        const subReddits = ["funny", "memes", "cursedcomments"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
  
        const img = await randomPuppy(random);
  
        const memeEmbed = new Discord.MessageEmbed()
        .setColor("0x36393e")
        .setImage(img)
        .setTitle(`Memes from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)
        .setTimestamp()
  
        message.channel.bulkDelete(1, true)
        message.channel.send({ embeds: [memeEmbed] });
    }
}