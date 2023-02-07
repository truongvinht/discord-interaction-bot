
const { InteractionResponseType } = require('discord-interactions');
const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();
const data = require("./figures.json")

class GIRandomPick {
  constructor(res) {
    this.res = res;
  }

  send(interaction) {
    const types = data.types;
    const elements = data.elements;

    let pickedType = Math.floor(Math.random() * Math.floor(types.length));
    let pickedElement = Math.floor(Math.random() * Math.floor(elements.length));
    let pickedRate = Math.floor(Math.random() * Math.floor(2)) + 4; 

    return this.res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Hey ${interaction.member.user.username}, suche dir eine ${types[pickedElement]}-Figur aus, die ${elements[pickedType]} und ${pickedRate} ist.`,
        },
      });
  }
}

module.exports = GIRandomPick;
