const { InteractionResponseType } = require("discord-interactions");
const GamingService = require('../services/GamingService');

class GIRandomPick {
  static cmd = "pick";
  constructor(res) {
    this.res = res;
    this.service = new GamingService();
  }

  send(interaction) {

    const own = this;

    const callback = (weaponResponse, weaponError) => {
      if (weaponError != null) {
        own.res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `ERROR - Server is down...`,
          },
        });
      } else {
        
        const types = weaponResponse.data;
        let pickedType = Math.floor(Math.random() * Math.floor(types.length));

        // get the type
        const type = types[pickedType];

        // fetch element
        const elementCallback = (elementResponse, elementError) => {
          if (elementError != null) {
            own.res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                content: `ERROR - Server is down...`,
              },
            });
          } else {
            const elements = elementResponse.data;
            const pickedElement = Math.floor(Math.random() * Math.floor(elements.length));
    
            // get the name
            const name = elements[pickedElement].name;
            const url = elements[pickedElement].image_url;
    
            own.res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                  content: `<@${interaction.member.user.id}>, suche dir eine ${name}-Figur aus, die ${type}-Waffe verwendet. (${url})`,
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
