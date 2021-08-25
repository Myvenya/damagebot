const { MessageEmbed, Permissions } = require('discord.js')
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    description: 'Shows the users information.',
    execute: async(client, message) => {

        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return
        if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
        if (member.presence.status === 'online') member.presence.status = 'Online';
        if (member.presence.status === 'idle') member.presence.status = 'Idle';
        if (member.presence.status === 'offline') member.presence.status = 'Offline';

        let x = Date.now() - member.createdAt;
        let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
        const joined = Math.floor(y / 86400000);

        const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        let status = member.presence.status;

        const userEmbed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`User Info`)
        .setTimestamp()
        .setColor('RANDOM')
        .setImage(member.user.displayAvatarURL())
        .addField("Member ID", member.id)
        .addField('Roles', `<@&${member._roles.join('> <@&')}>`)
        .addField("Account Created On:", ` ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
        .addField('Joined', `${joineddate} \n> ${joined} day(s) Ago`)
        .addField("Status", status)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({size: 1024}))

       
        message.channel.send({ embeds: [userEmbed] });

    },
}