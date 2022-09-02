import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

import { dirname, importx } from "@discordx/importer";
import { ActivityType, Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import express from "express";
import createBrowserInstance from "./scraper/browser.js";
import VisitWebsiteAction from "./scraper/actions/visit-website-action.js";

const app: express.Application = express();

const port: number = 3000;

export const bot = new Client({
  // To only use global commands (use @Guild for specific guild command), comment this line
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

  // Discord intents
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates
  ],

  // Debug logs are disabled in silent mode
  silent: false,

  // Configuration for @SimpleCommand
  simpleCommand: {
    prefix: "!",
  },
});

bot.once("ready", async () => {
  // Make sure all guilds are cached
  await bot.guilds.fetch();

  // Synchronize applications commands with Discord
  await bot.initApplicationCommands();

  // To clear all guild commands, uncomment this line,
  // This is useful when moving from guild commands to global commands
  // It must only be executed once
  //
  //  await bot.clearApplicationCommands(
  //    ...bot.guilds.cache.map((g) => g.id)
  //  );

  console.log("Bot started");

  console.log("Getting site ping");
    const browser = await createBrowserInstance();

    const response: number = await VisitWebsiteAction.action(browser);
    if (response >= -1)
      bot.user?.setActivity(
        `UMak TBL - ${response / 1000}s response time.`,
      );

      await browser?.close();

      console.log("Browser closed.");

  setTimeout(async () => {
    console.log("Getting site ping");
    const browser = await createBrowserInstance();

    const response: number = await VisitWebsiteAction.action(browser);
    if (response <= -1)
      bot.user?.setActivity(
        `UMak TBL - ${response / 1000}s response time.`,
      );

      await browser?.close();

      console.log("Browser closed.");
  }, 1800000)
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  bot.executeCommand(message);
});

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");

  // Let's start the bot
  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  // Log in with your bot token
  await bot.login(process.env.BOT_TOKEN);
}

app.get("/", (req, res) => {
  
})

app.listen(port,() => {
  run();
  console.log(`listening to port ${port} and discord bot started.`);
})

