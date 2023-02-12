
const { InteractionResponseType } = require('discord-interactions');
const GamingService = require('../services/GamingService');

class GIRandomFigure {

  static cmd = 'figure';

  constructor(res) {
    this.res = res;
  }

  send(interaction) {
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
        const pickedFigure = Math.floor(Math.random() * Math.floor(figures.length));

        // get the name
        const name = figures[pickedFigure].name;
        const url = figures[pickedFigure].image_url;

        this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `<@${interaction.member.user.id}>, spiele mal ${name}. ${url}`,
            },
          });
      }
    };

    const service = new GamingService();
    service.fetchAllFigures(callback);
  }
}

module.exports = GIRandomFigure;
