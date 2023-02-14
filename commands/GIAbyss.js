const { InteractionResponseType } = require("discord-interactions");
const GamingService = require("../services/GamingService");

class TestCommand {
  static cmd = "abyss";
  constructor(res) {
    this.res = res;
  }

  send(message) {
    const callback = (response, error) => {
        const figures = response.data;
        const pickedFigures = [];

        let text =  `<@${message.member.user.id}>, spiele im Abgrund mit nur Figuren aus dieser Liste:\n`;

        do {
          const random = Math.floor(Math.random() * figures.length);
          if (!pickedFigures.includes(random)) {
              const name = figures[random].name;
              text = `${text} - ${name}\n`;
              pickedFigures.push(figures[random]);
          }
        } while (pickedFigures.length < 11);

        this.res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `${text}`,
          },
        });
    };

    const service = new GamingService();
    service.fetchAllFigures(callback);
  }
}

module.exports = TestCommand;
