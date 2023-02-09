const { InteractionResponseType } = require("discord-interactions");
const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();
const data = require("./figures.json");

class TestApi {
  static cmd = "debug";
  constructor(res) {
    this.res = res;
  }

  async fetchData(apiServer) {
    return await 
  }

  send(interaction, apiServer) {

    const response = fetch(`${apiServer}/api/yuanshen/elements`).then(response => response.text())
    .catch(error => {
      console.error(error);
    });


    return this.res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `${interaction.member.user.username}, etwas stimmt hier nicht ${response}.`,
      },
    });
  }
}

module.exports = TestApi;
