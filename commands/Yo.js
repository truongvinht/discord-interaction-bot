
const { InteractionResponseType } = require('discord-interactions');
const LogHelper = require("../loaders/loghelper");
const logger = LogHelper.getInstance();

class Yo {
  constructor(res) {
    this.res = res;
  }

  send() {
    return this.res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Yo ${interaction.member.user.username}!`,
        },
      });
  }
}

module.exports = Yo;
