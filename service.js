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
  verifyKeyMiddleware,
  Option
} = require("discord-interactions");
const Yo = require("./commands/Yo");
const GIRandomPick = require("./commands/GIRandomPick")
const GIRandomFigure = require("./commands/GIRandomFigure")
const GIRandomHealer = require("./commands/GIRandomHealer")

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

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    console.log(interaction.data.name);

    // reply yo command
    if (interaction.data.name == "yo") {
      const cmd = new Yo(res);
      return cmd.send(interaction);
    }

    if (interaction.data.name == GIRandomPick.cmd) {
      const cmd = new GIRandomPick(res);
      return cmd.send(interaction);
    }

    if (interaction.data.name == GIRandomFigure.cmd) {
      const cmd = new GIRandomFigure(res);
      return cmd.send(interaction);
    }

    if (interaction.data.name == GIRandomHealer.cmd) {
      const cmd = new GIRandomHealer(res);
      return cmd.send(interaction);
    }

    if (interaction.data.name == "dm") {
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
      description: "Random Figurenauswahl",
      options: [],
    },
    {
      name: GIRandomPick.cmd,
      description: "get random figure to play",
      options: [],
    },
    {
      name: GIRandomHealer.cmd,
      description: "get random healer to play",
      options: [],
    },
    {
      name: "dm",
      description: "sends user a DM",
      options: [],
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

module.exports = app;
