const { Permissions, MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = {
	name: 'rules',
	description: 'posts the rules',
	execute: async(client, message) => {
        
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('rules')
                .setLabel('I agree.')
                .setStyle('SUCCESS'),
        );

        const rulesEmbed = new MessageEmbed()
        .setAuthor("Our rules.", client.user.displayAvatarURL())
        .setColor('0x36393e')
        .setDescription('Thank you for stopping by, please read all of the rules below - and then click the "I agree" button at the bottom.')
        .addField("**§1-0** Interacting with others.", '**§1-1** Do not organize, participate in, or encourage harassment of others.\n**§1-2** Do not organize, promote, or coordinate conversations around hate speech.\n**§1-3** Do not make threats of violence of threaten to harm others, including yourself.\n**§1-4** Be kind to everyone around you, try to avoid drama, toxicity, and racism.')
        .addField('**§2-0** Posting of content', `**§2-1** Stay on topoc. Comments, questions and contributions should be relevant to the topic being discussed.\n**§2-2** Do not upload or post inappropriate content.\n**§2-3** No spam, and keep it legal.`)

        
        message.channel.send({ embeds: [rulesEmbed], components: [row] });
    }
}