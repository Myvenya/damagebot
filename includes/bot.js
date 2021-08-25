// ### Required Packages ###
const Discord = require('discord.js');
const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../config/config.json');
const prefix = config.PREFIX;
const client = new Client({ 
  partials: ["USER","MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"], 
  intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] 
});

// ### Packages ###
const fs = require("fs"); // Filesystem
const chalk = require("chalk"); // Colored terminal
const Levels = require('discord-xp') // Leveling system
const mongoCurrency = require('discord-mongo-currency');
const mongoose = require('mongoose'); // Database
const { Player } = require("discord-player");
const player = new Player(client);
client.player = player;
client.config = config;
client.commands = new Discord.Collection();
module.exports = client;


// ### Command Handler ###
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
  console.log(chalk.green(`[COMMAND] Loading "${command.name}"...[OK]`));
}

// ### Event Handler ###
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
    console.log(chalk.cyan(`[EVENT] Loading "${event.name}"...[OK]`))
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
    console.log(chalk.cyan(`[EVENT] Loading "${event.name}"...[OK]`));
  }
}

// ### Message Handler ###
client.on("messageCreate", message => {

  //Variables
  let msg = message.content.toUpperCase();
  let newMsg = message.content.toUpperCase();
  let sender = message.author;

  //Return Statements
  if (!msg.startsWith(prefix)) return;
  if (!message.guild) return;
  if (message.author.bot) return;

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('messageCreate', async message => {

  if(message.author.bot) return;
  const randomXP = Math.floor(Math.random() * 9) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.reply({ content: `Congratulations ${message.author}, you've just reached level ${user.level}!`, ephemeral: true });
  }

})

// ### Ticket Handler ###
client.on('messageCreate', async message => {

  if(message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch()

  let args = message.content.slice(prefix.length).split(' ');
  let command = args.shift().toLowerCase();

  if(message.guild) {
      if(command == "closeticket") {
        if(message.channel.parentId === "864213413461622815") {
            const person = message.guild.members.cache.get(message.channel.name)
            if(!person) {
                return message.channel.send({ content: `There's an error in closing the ticket, the general issue is the channel was renamed or deleted.`, ephemeral: true });
            } await message.channel.delete()

            let tckClosed = new Discord.MessageEmbed()
            .setAuthor("Ticket Closed", client.user.displayAvatarURL())
            .setColor(0x36393e)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription("Thank you for using the ticket system, we hope that the help you got resolved your issue.\n\nYour ticket has been marked as **complete**. If you wish to reopen this, or create a new one, please send a message to the bot.")
            .setFooter(`Ticket closed by ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            
            return person.send({ embeds: [tckClosed] })
          }
        }

  if(message.channel.parentId) {
    const category = message.guild.channels.cache.get("864213413461622815")
    if(message.channel.parentId == category.id) {
        let member = message.guild.members.cache.get(message.channel.name)
        if(!member) return message.channel.send({ content: `Something went wrong with sending the message.`, ephemeral: true });
    
        let tckAccept = new Discord.MessageEmbed()
        .setColor("0x36393e")
        .setAuthor("You've been contacted by a moderator.")
        .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(message.content)
        .setTimestamp()
    
        return member.send({ embeds: [tckAccept] })
      }
    } 
  }
  
  if(!message.guild) {
      const guild = await client.guilds.cache.get("862168199847477288");
      if(!guild) return;

      const main = guild.channels.cache.find((x) => x.name == message.author.id);
      const category = guild.channels.cache.get("864213413461622815");

      if(!main) {
          let mx = await guild.channels.create(message.author.id, {
                type: "text",
              parent: category.id,
              topic: "This channel is created for helping  **" + message.author.tag + " **"
          })
          
          let tckSuccess = new Discord.MessageEmbed()
          .setAuthor("Your ticket has been successfully created.")
          .setColor("0x36393e")
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription("Thank you for sumbitting a ticket, a moderator should be with you shortly.")
          .addField("Are you here to report someone, or to talk business?", "The first step to get help is to follow the rules - for information regarding business, please check <#864212762519011338>.")
          .setTimestamp()
          message.author.send({ embeds: [tckSuccess] })

          const tckModerator = new Discord.MessageEmbed()
          .setAuthor(`Ticket from ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
          .setColor("0x36393e")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          .setDescription("You can answer the ticket by replying in this channel.")
          .addField("Regarding", message.content)
          .setFooter(`Help requested by ${message.author.username}`, message.author.avatarURL)
          .setTimestamp()
        return mx.send({ embeds: [tckModerator] })
      }

      let tckChanged = new Discord.MessageEmbed()
      .setColor("0x36393e")
      .setAuthor(`The ticket has been updated.`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setDescription(message.content)
      main.send({ embeds: [tckChanged] })
      } 
});

// ### Database Connection ###
Levels.setURL("", { useNewUrlParser: true, useUnifiedTopology: true })
console.log(chalk.cyanBright('[SYSTEM] Successfully connected to database.'))

client.login(config.TOKEN)
