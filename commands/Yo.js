
const { InteractionResponseType } = require('discord-interactions');

class Yo {
  constructor(res) {
    this.res = res;
  }

  send(interaction) {
    return this.res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Yo ${interaction.member.user.username}!`,
        },
      });
  }
}

module.exports = Yo;
