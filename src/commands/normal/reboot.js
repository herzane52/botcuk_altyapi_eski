const { ActivityType } = require('discord.js');
const logger = require('silly-logger');
const { EmbedBuilder } = require('discord.js');
const os = require("os");

module.exports = {
    name: "rbot",
    aliases: ["rbot"],
    cooldown: 6000,//1 saniye = 1000 ms / cooldown olmasını istemezseniz 0 yazın.
    run: async (client, message, args) => {
      if(message.author.id !== "705752949300658217")  return;

        setTimeout(() => {
   
          logger.warn(`YENİDEN BAŞLATMA İŞLEMİ BAŞARILI`);
          process.exit(0);
       }, 10000)
    }
 };