const { Message } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    description: 'Buttons',
    execute: async(interaction) => {
        if (!interaction.isMessageComponent()) return;

        if(interaction.customId == "rules") {
        const role = interaction.guild.roles.cache.get('862170021537906728');
        const member = interaction.member
    
        await interaction.reply({ content: `You've been added to the ${role} role.`, ephemeral: true })
        member.roles.add(role)
        }

        if(interaction.customId == 'invite') {

            let invite = await interaction.channel.createInvite(
                {
                maxAge: 86400,
                maxUses: 1
            },
            ).catch(console.log)

            const member = interaction.member
            member.send(invite ? `Here is an invite link for ${interaction.guild.name} that has one use, and expires in 24 hours. ${invite}` : "There has been an error during the creation of the invite.").catch(error => {
                interaction.reply({ content: `I tried to send you a message but it seems you have your privacy settomgs turned on - use the copyable link above.`, ephemeral: true });
            });
        }
    },
}