
const { InteractionResponseType } = require('discord-interactions');
const GamingService = require('../services/GamingService');

class GIMePick {

  static cmd = 'me';

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
        // get the name
        const name = response.name;
        const url = response.image_url;

        this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `<@${interaction.member.user.id}>, spiele mal ${name}. (${url})`,
            },
          });
      }
    };

    const service = new GamingService();
    service.fetchMyFigure(interaction.member.user.id, callback);
  }
}

module.exports = GIMePick;
