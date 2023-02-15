const { InteractionResponseType } = require('discord-interactions');
const GamingService = require('../services/GamingService');

class TestCommand {
  static cmd = 'abyss';
  constructor(res) {
    this.res = res;
  }

  send(message) {
    const callback = (response, error) => {
      if (error != null) {
        this.res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `ERROR - Server is down...`,
          },
        });
      } else {
        const figures = response.data;
        const pickedFigures = [];

        let text = `<@${message.member.user.id}>, spiele im Abgrund mit nur Figuren aus dieser Liste:\n`;

        // tmp black list preventing picking it
        const blacklist = ['Nilou','Tighnari']

        // add at least 2 healer
        const extData = require('./figures.json');
        do {
            const random = Math.floor(Math.random() * extData.healer.length);
            if (!pickedFigures.includes(random)) {
              const name = extData.healer[random];
  
              if (!blacklist.includes(name)) {
                  text = `${text} - ${name}\n`;
                  pickedFigures.push(random);
              }
            }
          } while (pickedFigures.length < 2);

        do {
          const random = Math.floor(Math.random() * figures.length);
          if (!pickedFigures.includes(random)) {
            const name = figures[random].name;

            if (!blacklist.includes(name)) {
                text = `${text} - ${name}\n`;
                pickedFigures.push(random);
            }
          }
        } while (pickedFigures.length < 10);

        this.res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `${text}`,
          },
        });
      }
    };

    const service = new GamingService();
    service.fetchAllFigures(callback);
  }
}

module.exports = TestCommand;
