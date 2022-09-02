import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { bot } from "../main.js";
import VisitWebsiteAction from "../scraper/actions/visit-website-action.js";
import createBrowserInstance from "../scraper/browser.js";

@Discord()
export class Ping {
  @Slash()
  async ping(interaction: CommandInteraction): Promise<void> {
    await interaction.reply("Fetching response time from TBL Hub...");
    const browser = await createBrowserInstance();

    const response: number = await VisitWebsiteAction.action(browser);
    if (response >= -1)
      bot.user?.setActivity(
        `UMak TBL - ${response / 1000}s response time.`,
      );

    await interaction.editReply(`Success! TBL Hub Response time is ${response / 1000}s, ${response < 30 ? "that is slow..." : "pretty fast!" }`);

    await browser?.close();
  }
}
