const { InteractionResponseType } = require('discord-interactions');
const OpenAiService = require('../services/OpenAiService');

class TestCommand {
  static cmd = 'askme';
  constructor(res) {
    this.res = res;
  }

  send(message) {
    if (Object.prototype.hasOwnProperty.call(message.data, 'options')) {
      const callback = (response, error) => {
        if (error != null) {
          this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `ERROR - Server has some problems. Try again later...`,
            },
          });
        } else {
          const { text } = response.choices[0];

          this.res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `${message.member.user.id}: ${message.data.options[0].value}\n\nBot: ${text}`,
            },
          });
        }
      };

      const service = new OpenAiService();
      service.request(callback, message.data.options[0].value);
    } else {
      this.res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `<@${message.member.user.id}>, bitte versuche es erneut mit einer Frage.`,
        },
      });
    }
  }
}

module.exports = TestCommand;
