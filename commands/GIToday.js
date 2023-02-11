
const { InteractionResponseType } = require('discord-interactions');
const GamingService = require('../services/GamingService');

class GIToday {

  static cmd = 'today';

  constructor(res) {
    this.res = res;
  }

  send() {
    const callback = (response, error) => {
      if (error != null) {
        this.res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `ERROR - Server is down...`,
          },
        });
      } else {
        const talents = response.data;
        let list = [];

        talents.forEach(talent => {
            list.push(talent.name);
          });
        const talentString = list.join('\n ');

        this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `Heute sind folgende Talente farmbar ${talentString}.`,
            },
          });
      }
    };

    const service = new GamingService();
    service.fetchTodayTalents(callback);
  }
}

module.exports = GIToday;
