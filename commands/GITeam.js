const { InteractionResponseType } = require("discord-interactions");
const GamingService = require("../services/GamingService");

class GITeamCommand {
  static cmd = "team";
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
        if (Object.prototype.hasOwnProperty.call(message.data, "options")) {
          const pickedFigures = [];

          let text =  `<@${message.member.user.id}>, spiele mal \n`;
          let textUrl = ``;

          do {
            const random = Math.floor(Math.random() * figures.length);
            if (!pickedFigures.includes(random)) {
                
                const name = figures[random].name;
                const url = figures[random].image_url;
                textUrl = `${textUrl} ${url}`;
                text = `${text} - ${name}\n`;
                pickedFigures.push(figures[random]);
            }
          } while (pickedFigures.length < message.data.options[0].value);

          this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `${text} \n${textUrl}`,
            },
          });

        } else {
          const pickedFigure = Math.floor(
            Math.random() * Math.floor(figures.length)
          );

          // get the name
          const name = figures[pickedFigure].name;
          const url = figures[pickedFigure].image_url;

          this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `<@${message.member.user.id}>, spiele mal ${name}. \n(${url})`,
            },
          });
        }
      }
    };

    const service = new GamingService();
    service.fetchAllFigures(callback);
  }
}

module.exports = GITeamCommand;
