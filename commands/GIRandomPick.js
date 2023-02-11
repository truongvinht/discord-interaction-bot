const { InteractionResponseType } = require("discord-interactions");
const GamingService = require('../services/GamingService');
const data = require("./figures.json");

class GIRandomPick {
  static cmd = "pick";
  constructor(res) {
    this.res = res;
    this.service = new GamingService();
  }

  send(interaction) {

    const own = this;

    const callback = (response, error) => {
      if (error != null) {
        this.res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `ERROR - Server is down...`,
          },
        });
      } else {
        
        const types = response.data;
        let pickedType = Math.floor(Math.random() * Math.floor(types.length));



        // get the type
        const type = pickedType[pickedType];

        // fetch element
        const elementCallback = (response, error) => {
          if (error != null) {
            this.res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: `ERROR - Server is down...`,
              },
            });
          } else {
            const elements = response.data;
            const pickedElement = Math.floor(Math.random() * Math.floor(elements.length));
    
            // get the name
            const name = elements[pickedElement].name;
    
            this.res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: `${interaction.member.user.username}, suche dir eine ${name}-Figur aus, die ${type}-Waffe verwendet.`,
                },
              });
          }
        };
        own.service.fetchAllElements(elementCallback);
      }
    };

    own.service.fetchAllWeaponTypes(callback);
  }
}

module.exports = GIRandomPick;
