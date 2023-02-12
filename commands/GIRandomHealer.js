
const { InteractionResponseType } = require('discord-interactions');
const data = require("./figures.json")

class GIRandomFigure {
  static cmd = 'healer';
  constructor(res) {
    this.res = res;
  }

  send(interaction) {
    const figures = data.healer;
    const names = interaction.data.options;
    console.log(JSON.stringify(names));

    let pickedFigure = Math.floor(Math.random() * Math.floor(figures.length));

    return this.res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `<@${interaction.member.user.id}>, spiele mal ${figures[pickedFigure]}.`,
        },
      });
  }
}

module.exports = GIRandomFigure;
