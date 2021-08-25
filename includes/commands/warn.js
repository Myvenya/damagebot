const { MessageEmbed, Permissions } = require('discord.js')
const db = require('quick.db');

module.exports = {
    name: "warn",
    description: "Warn a member",
    execute: async(client, message, args) => {

        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

        if(user.id === message.guild.owner.id) {
            return message.channel.send('You can\'t warn the server\'s owner');
        }

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
        
        if(warnings === 3) {
            message.channel.bulkDelete(1, true)
            return message.channel.send(`${user} has already reached three warnings`);
        }

        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            message.channel.bulkDelete(1, true)
            await message.channel.send(`**${user.username}** has been warned with the following reason: **${reason}**`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            message.channel.bulkDelete(1, true)
            await message.channel.send(`**${user.username}** has been warned with the following reason: **${reason}**`)
        }
    }
}


        