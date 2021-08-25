const { MessageEmbed } = require("discord.js");
module.exports = {
	name: 'guildMemberUpdate',
	description: '',
	execute(oldMember, newMember, client) {
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        const RoleEmbed = new MessageEmbed()
        RoleEmbed.setTitle("Role Updated")
        RoleEmbed.setColor("RED");
        RoleEmbed.setAuthor(newMember.user.tag, newMember.user.avatarURL());
        RoleEmbed.setFooter(`ID: ${newMember.user.id}`)
        RoleEmbed.setTimestamp()
        
        // Looping through the role and checking which role was removed.
        oldMember.roles.cache.forEach(role => {
            if (!newMember.roles.cache.has(role.id)) {
                RoleEmbed.addField("Changes:", `${newMember} was removed from the ${role} role.`);
            }
        });

        client.channels.cache.get("862196304720297994").send({ embeds: [RoleEmbed] });
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        const RoleEmbed = new MessageEmbed();
        RoleEmbed.setTitle("Role Updated")
        RoleEmbed.setColor("GREEN");
        RoleEmbed.setAuthor(newMember.user.tag, newMember.user.avatarURL());
        RoleEmbed.setFooter(`ID: ${newMember.user.id}`)
        RoleEmbed.setTimestamp()
        
        // Looping through the role and checking which role was added.
        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) {
                RoleEmbed.addField("Changes:", `${newMember} was added to the ${role} role.`);
            }
        });
        client.channels.cache.get("862196304720297994").send({ embeds: [RoleEmbed] });
        }
    }
}