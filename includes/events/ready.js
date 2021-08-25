const chalk = require('chalk')
const presences = [
    { type: 'PLAYING',  message: 'with you.'  },
    { type: 'PLAYING', message: 'with your imagination.' },
    { type: 'WATCHING', message: 'you.' },
    { type: 'WATCHING', message: 'you eat.' },
    { type: 'PLAYING', message: 'VRChat' }
  ];

module.exports = {
    name: 'ready',
    description: '',
    once: true,
    execute(client) {

        console.log(chalk.cyanBright('[SYSTEM] Loading complete.'));
        console.log(chalk.cyanBright(`[SYSTEM] Logged in as ${client.user.tag}.`));
      
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * (presences.length - 1) + 1);
            const presence = presences[randomIndex];
        
            client.user.setActivity(presence.message, { type: presence.type });
          }, 10000);
    },
};