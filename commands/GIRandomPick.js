const { InteractionResponseType } = require("discord-interactions");
const data = require("./figures.json");

class GIRandomPick {
  static cmd = "pick";
  constructor(res) {
    this.res = res;
  }

  send(interaction) {

    let types = undefined;
    let elements = undefined;

    elements = data.elements;

    types = data.types;

    let pickedType = Math.floor(Math.random() * Math.floor(types.length));
    let pickedElement = Math.floor(Math.random() * Math.floor(elements.length));

    return this.res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `${interaction.member.user.username}, suche dir eine ${elements[pickedElement]}-Figur aus, die ${types[pickedType]} ist.`,
      },
    });
  }
}

module.exports = GIRandomPick;
