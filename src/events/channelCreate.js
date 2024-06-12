const { EmbedBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');
const logger = require('silly-logger');
const { mongodbUri,serverId } = require('../config.js');
const Discord = require("discord.js");
const croxyDb = require("croxydb");

const dbClient = new MongoClient(String(mongodbUri));

module.exports = {
	name: 'channelCreate',
	once: false,
	async execute(channel) {
		const guildId = await channel.guild.id;
		const filter =  {
			_id: guildId,
		};
		try {
			await dbClient.connect();
			const db = dbClient.db("botcuk");
			const botCollection = db.collection("ozelBot");
			const guvenlickCollection = db.collection("guvenlik");
			const botResult = await botCollection.findOne(filter);
			const guvenlikResult = await guvenlickCollection.findOne(filter);

			// botResult değerinin var olup olmadığını kontrol et
			if (typeof botResult !== "undefined") {
			//varsa
			if (botResult) {
				// Özel bot açıksa geri dön
				if (botResult.enabled == true) return;
			//yoksa
			} else {
				// Sunucu koruma
				if (typeof guvenlikResult !== "undefined") {
					if (guvenlikResult) {
						if (guvenlikResult.enabled == true) {
							if (guvenlikResult.sunucu == true) {
										// Rolün silindiği sunucunun id'sini alın
										let guildId = channel.guild.id;
										async function fetchAuditLogsAsync() {
											try {
											  const logs = await channel.guild.fetchAuditLogs();
											  const userId = await logs.entries.first().executor.id;
											  const kullanıcı = await channel.guild.members.fetch(userId)
										  
										// CroxyDB'den o id'ye ve sunucuya ait puanı getirin veya yoksa 0 olarak alın
										let puan = croxyDb.get(`puan_${userId}_${guildId}`) || 0;
										// Puanı bir arttırın
										puan++;
										// CroxyDB'ye yeni puanı kaydedin
										croxyDb.set(`puan_${userId}_${guildId}`, puan);
										
										if (puan >= 10) {

											if (!kullanıcı.bannable) {

											  }else{
											  try {
												await channel.guild.members.ban(userId, { reason: "BOTÇUK SUNUCU KORUMA SİSTEMİ İLE BANLANDI" });
												croxyDb.delete(`puan_${userId}_${guildId}`);
												let owner = await channel.guild.fetchOwner();

												let embed2 = new EmbedBuilder()
												.setAuthor({ name: `${channel.guild.name}`, iconURL: channel.guild.iconURL(), url: channel.guild.url })
												.setTitle("SUNUCU KORUMA SİSTEMİ UYARISI")
												.setDescription(`\n- Cezalandırılan kullanıcı: **${kullanıcı.user.username} - ${kullanıcı.id}**\n- Korunan sunucu : **${channel.guild.name} - ${channel.guild.id}**\n- İşlem: **Sunucudan yasaklandı**`)
												.setThumbnail(kullanıcı.user.displayAvatarURL())
												.setColor("ff0000")
												owner.send({ embeds: [embed2] });
											  } catch (error) {
												console.error(error);
											  }
											}	
										} else {
											setTimeout(() => {
												if (!croxyDb.has(`puan_${userId}_${guildId}`)) return;
												let puan1 = croxyDb.get(`puan_${userId}_${guildId}`) || 0;
												if (puan1 == 1) {
												croxyDb.delete(`puan_${userId}_${guildId}`);
												}else {
												puan1 = parseInt(puan1) - 1
												croxyDb.set(`puan_${userId}_${guildId}`, puan1);
												}
											}, 10000);
											
										}
									} catch (error) {
										console.error(error);
									  }
									}
									
									fetchAuditLogsAsync();

							}
						}
					}
				}//Sunucu koruma bitiş
				
			}
		}
	}
		catch (err) {
			logger.error(err);
		}
	},
};