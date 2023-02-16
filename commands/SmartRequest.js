const { InteractionResponseType } = require('discord-interactions');
const OpenAiService = require('../services/OpenAiService');

const axios = require("axios");
const TOKEN = process.env.TOKEN;

const discord_api = axios.create({
    baseURL: "https://discord.com/api/",
    timeout: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Authorization",
      Authorization: `Bot ${TOKEN}`,
    },
  });

class SmartRequest {
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

          let c = (
            discord_api.post(`/users/@me/channels`, {
              recipient_id: message.member.user.id,
            })
          ).data;
          try {
            // https://discord.com/developers/docs/resources/channel#create-message
            let res = discord_api.post(`/channels/${c.id}/messages`, {
              content:
              `${message.member.user.id}: ${message.data.options[0].value}\n\nBot: ${text}`,
            });
            console.log(res.data);
          } catch (e) {
            console.log(e);
          }
        }
      };

      const service = new OpenAiService();
      service.request(callback, message.data.options[0].value);

      this.res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
          content: `${message.member.user.username}, antwort wird gesucht...`,
        },
      });
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

module.exports = SmartRequest;
