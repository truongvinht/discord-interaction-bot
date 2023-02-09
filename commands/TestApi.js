const { InteractionResponseType } = require("discord-interactions");
const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();
const data = require("./figures.json");
const API_SERVER = process.env.API_SERVER || "localhost:3000";

class TestApi {
  static cmd = "debug";
  constructor(res) {
    this.res = res;
  }

  send(interaction) {

    const response = fetch(`${API_SERVER}/api/yuanshen/elements`).then(response => response.json())
    .catch(error => {
      console.error(error);
    });

    response.then(content => {
        this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `${interaction.member.user.username}, etwas stimmt hier nicht ${content.data[0].name}.`,
            },
          });
    })
  }
}

module.exports = TestApi;
