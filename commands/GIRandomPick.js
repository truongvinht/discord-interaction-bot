const { InteractionResponseType } = require("discord-interactions");
const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();
const data = require("./figures.json");

class GIRandomPick {
  static cmd = "rngpick";
  constructor(res) {
    this.res = res;
  }

  async fetchData(apiServer) {
    return await fetch(`${apiServer}/api/yuanshen/elements`);
  }

  send(interaction, apiServer) {

    // fetch
    const response = this.fetchData(apiServer);

    let types = undefined;
    let elements = undefined;

    if (!response.ok) {
      // fallback local json res
      elements = data.elements;
      console.log(JSON.stringify(response));
    } else {
      
      const data = response.data;

      elements = [];
      for (let obj in data) {
        elements.push(obj.name);
      }
      console.log(JSON.stringify(elements));
    }

    types = data.types;

    let pickedType = Math.floor(Math.random() * Math.floor(types.length));
    let pickedElement = Math.floor(Math.random() * Math.floor(elements.length));
    let pickedRate = Math.floor(Math.random() * Math.floor(2)) + 4;

    return this.res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `${interaction.member.user.username}, suche dir eine ${elements[pickedElement]}-Figur aus, die ${types[pickedType]} und ${pickedRate}-Sterne ist.`,
      },
    });
  }
}

module.exports = GIRandomPick;
