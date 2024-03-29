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
  verifyKeyMiddleware,
} = require("discord-interactions");
const Yo = require("./commands/Yo");
const GIRandomPick = require("./commands/GIRandomPick");
const GIRandomFigure = require("./commands/GIRandomFigure");
const GIToday = require("./commands/GIToday");
const GITeam = require("./commands/GITeam");
const GIAbyss = require("./commands/GIAbyss");
const GIMePick = require("./commands/GIMePick");

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

  const { type, data } = req.body;

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

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

    if (name === GIToday.cmd) {
      const cmd = new GIToday(res);
      cmd.send();
      return;
    }

    if (name === GITeam.cmd) {
      const cmd = new GITeam(res);
      cmd.send(interaction);
      return;
    }

    if (name === GIAbyss.cmd) {
      const cmd = new GIAbyss(res);
      cmd.send(interaction);
      return;
    }

    if (name === GIMePick.cmd) {
      const cmd = new GIMePick(res);
      cmd.send(interaction);
      return;
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
      description: "Zufaellige Figurenauswahl in Genshin",
      options: [],
    },
    {
      name: GIRandomPick.cmd,
      description: "Zufaellige Figurenbeschreibung in Genshin",
      options: [],
    },
    {
      name: GIAbyss.cmd,
      description: "Dein Team fuer den Abgrund",
      options: [],
    },
    {
      name: GIToday.cmd,
      description: "Liste der heute verfuegbaren Farm-Optionen",
      options: [],
    },
    {
      name: GIMePick.cmd,
      description: "Zufaellige Figur in Genshin, die du hast",
      options: [],
    },
    {
      name: GITeam.cmd,
      type: 1,
      description: "Zufaelliges Team in Genshin",
      options: [
        {
          name: "pl",
          description: "Spieler Anzahl angeben",
          type: 4,
          min_value: 1,
          max_value: 4,
          focus: true
        },
      ],
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
