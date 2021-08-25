const { Permissions } = require("discord.js");
module.exports = {
	name: 'purge',
	description: 'Clears up to 99 messages.',
	execute(client, message, args) {

        
		const amount = parseInt(args[0]) + 1;

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
		});
	},
};