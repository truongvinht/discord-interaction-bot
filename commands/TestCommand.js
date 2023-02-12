
const { InteractionResponseType } = require('discord-interactions');

class TestCommand {
  static cmd = 'test';
  constructor(res) {
    this.res = res;
  }

  send(message) {
    return this.res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `<@${message.member.user.id}>: ${message.data.options[0].value}.`,
        },
      });
  }
}

module.exports = TestCommand;
