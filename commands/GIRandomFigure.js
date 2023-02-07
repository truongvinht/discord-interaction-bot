
const { InteractionResponseType } = require('discord-interactions');
const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();
const data = require("./figures.json")

class GIRandomFigure {
  static cmd = 'rngfigure';
  constructor(res) {
    this.res = res;
  }

  send(interaction) {
    const figures = data.figures;
    const names = interaction.data.options;
    console.log(JSON.stringify(names));

    let pickedFigure = Math.floor(Math.random() * Math.floor(figures.length));

    return this.res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${interaction.member.user.username}, spiele mal ${figures[pickedFigure]}.`,
        },
      });
  }
}

module.exports = GIRandomFigure;
