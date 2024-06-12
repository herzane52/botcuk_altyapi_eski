const { EmbedBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');
const logger = require('silly-logger');
const { mongodbUri,serverId,config } = require('../config.js');
const Discord = require("discord.js");

const dbClient = new MongoClient(String(mongodbUri));

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
		const guildId = member.guild.id;
		const filter =  {
			_id: guildId,
		};
		try {
			await dbClient.connect();
			const db = dbClient.db("botcuk");
			const botCollection = db.collection("ozelBot");
			const collection = db.collection("otoRol");
			const botResult = await botCollection.findOne(filter);
			const result = await collection.findOne(filter);
			if (result) {
				if (result.enabled == true) {
                    if (botResult) {
						// Özel bot açıksa geri dön
                    if (botResult.enabled == true) return;
						if (!member.user.bot) {
							if (result.userRol == true) {
								const user = await member.guild.roles.fetch(result.role[1]);
                        		await member.roles.add(user)
                            }
						}else{
							if (result.botRol == true) {
								const bot = await member.guild.roles.fetch(result.role2[1]);
								await member.roles.add(bot)
								}

						}
					}
				} else {
					logger.error("bilinmeyen hata");				}
			}
		 }
		 catch (err) {
			//logger.error(err);
			const channel = member.channels.cache.get(config.hata);
			await channel.channel.send(`Sistem hatası ${err.stack}.js
			hata bilgisi
			\`\`\`js\n${err}\n\`\`\`
			`);
		}
	},
};