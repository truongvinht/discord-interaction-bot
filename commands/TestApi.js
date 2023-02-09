const { InteractionResponseType } = require("discord-interactions");
const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();
const data = require("./figures.json");

class TestApi {
  static cmd = "debug";
  constructor(res) {
    this.res = res;
  }

  send(interaction, apiServer) {

    const response = fetch(`${apiServer}/api/yuanshen/elements`).then(response => JSON.stringify(response))
    .catch(error => {
      console.error(error);
    });


    response.then(content => {
        console.log(JSON.stringify(content));
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
