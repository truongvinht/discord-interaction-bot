
const { InteractionResponseType } = require('discord-interactions');
const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();
const API_SERVER = process.env.API_SERVER || "localhost:3000";

class GIRandomFigure {
  static cmd = 'figure';
  constructor(res) {
    this.res = res;
  }

  send(interaction) {

    const origin = this.res;
    const response = fetch(`${API_SERVER}/api/yuanshen/characters`).then(response => response.json())
    .catch(error => {
      console.error(error);
      origin.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `ERROR - Server is down...`,
        },
      });
    });

    response.then(content => {
        const figures = content.data;
        const pickedFigure = Math.floor(Math.random() * Math.floor(figures.length));

        // get the name
        const name = figures[pickedFigure].name;

        this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `${interaction.member.user.username}, spiele mal ${name}.`,
            },
          });
    });
  }
}

module.exports = GIRandomFigure;
