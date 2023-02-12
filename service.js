/* eslint-disable no-undef */
require("dotenv").config();
const APPLICATION_ID = process.env.APPLICATION_ID;
const TOKEN = process.env.TOKEN;
const PUBLIC_KEY = process.env.PUBLIC_KEY || "not set";
const GUILD_ID = process.env.GUILD_ID;

const axios = require("axios");
const express = require("express");
const {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware
} = require("discord-interactions");
const Yo = require("./commands/Yo");
const GIRandomPick = require("./commands/GIRandomPick")
const GIRandomFigure = require("./commands/GIRandomFigure")
const GIRandomHealer = require("./commands/GIRandomHealer")
const GIToday = require("./commands/GIToday")

const {getRPSChoices, capitalize} = require('./game');

const app = express();

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

app.post("/interactions", verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;

  const {type, id, data} = req.body;

  if (type === InteractionType.APPLICATION_COMMAND) {
    const {name} = data; 

    // reply yo command
    if (name === "yo") {
      const cmd = new Yo(res);
      return cmd.send(interaction);
    }

    if (name === GIRandomPick.cmd) {
      const cmd = new GIRandomPick(res);
      return cmd.send(interaction);
    }

    if (name === GIRandomFigure.cmd) {
      const cmd = new GIRandomFigure(res);
      cmd.send(interaction);
      return;
    }

    if (name === GIRandomHealer.cmd) {
      const cmd = new GIRandomHealer(res);
      return cmd.send(interaction);
    }

    if (name === GIToday.cmd) {
      const cmd = new GIToday(res);
      cmd.send();
      return;
    }
     // "challenge" guild command
    if (name === "challenge" && id) {
      const userId = req.body.member.user.id;
      // User's object choice
      const objectName = req.body.data.options[0].value;

      // Create active game using message ID as the game ID
      activeGames[id] = {
        id: userId,
        objectName
      };

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `Rock papers scissors challenge from <@${userId}>`,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  // Append the game ID to use later on
                  custom_id: `accept_button_${req.body.id}`,
                  label: "Accept",
                  style: ButtonStyleTypes.PRIMARY
                }
              ]
            }
          ]
        }
      });
    }

    if (name === "dm") {
      // https://discord.com/developers/docs/resources/user#create-dm
      let c = (
        await discord_api.post(`/users/@me/channels`, {
          recipient_id: interaction.member.user.id,
        })
      ).data;
      try {
        // https://discord.com/developers/docs/resources/channel#create-message
        let res = await discord_api.post(`/channels/${c.id}/messages`, {
          content:
            "Yo! I got your slash command. I am not able to respond to DMs just slash commands.",
        });
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }

      return res.send({
        // https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "👍",
        },
      });
    }
  }
});

app.get("/register_commands", async (req, res) => {
  let slash_commands = [
    {
      name: "yo",
      description: "replies with Yo!",
      options: [],
    },
    {
      name: GIRandomFigure.cmd,
      description: "Zufaellige Figurenauswahl in Genshin",
      options: [],
    },
    {
      name: GIRandomPick.cmd,
      description: "Zufaellige Figurenbeschreibung in Genshin",
      options: [],
    },
    {
      name: GIRandomHealer.cmd,
      description: "Zufaellige Figurenauswahl für Heiler in Genshin",
      options: [],
    },
    {
      name: GIToday.cmd,
      description: "Liste der heute verfuegbaren Farm-Optionen",
      options: [],
    },
    {
      name: "dm",
      description: "sends user a DM",
      options: [],
    },
    {
      name: "challenge",
      description: "Challenge to a match of rock paper scissors",
      options: [
        {
          type: 3,
          name: "object",
          description: "Pick your object",
          required: true,
          choices: createCommandChoices()
        }
      ],
      type: 1
    },
  ];
  try {
    // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
    let discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
      slash_commands
    );
    console.log(discord_response.data);
    return res.send("commands have been registered");
  } catch (e) {
    console.error(e.code);
    console.error(e.response?.data);
    return res.send(`${e.code} error from discord`);
  }
});

app.get("/", async (req, res) => {
  return res.send("Follow documentation ");
});

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase()
    });
  }

  return commandChoices;
}

module.exports = app;
