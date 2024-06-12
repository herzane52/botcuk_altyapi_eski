const { EmbedBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');
const logger = require('silly-logger');
const { mongodbUri,serverId ,config } = require('../config.js');
const Discord = require("discord.js");

const dbClient = new MongoClient(String(mongodbUri));

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
		const guildId = await member.guild.id;
		const filter =  {
			_id: guildId,
		};
		try {
			await dbClient.connect();
			const db = dbClient.db("botcuk");
			const botCollection = db.collection("ozelBot");
			const collection = db.collection("kayit");
			const guvenlickCollection = db.collection("guvenlik");
			const otoRolCollection = db.collection("otoRol");
			const botResult = await botCollection.findOne(filter);
			const otoRolResult = await otoRolCollection.findOne(filter);
			const guvenlikResult = await guvenlickCollection.findOne(filter);
			const result = await collection.findOne(filter);

			// botResult değerinin var olup olmadığını kontrol et
			if (typeof botResult !== "undefined") {
			//varsa
			if (botResult) {
				// Özel bot açıksa geri dön
				if (botResult.enabled == true) return;
			//yoksa
			} else {
				// kayıt sistemi
				if (typeof result !== "undefined") {
					if (result) {
						if (result.enabled == true) {
							// botsa geri dön
							if (member.user.bot) return;

							const memberMention = `<@${member.user.id}>`;
							const memberId = member.id;
							const accountDate =  `<t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`;
							const memberName = member.displayName;
							const avatar = `[Tıkla](${member.user.avatarURL({dynamic:true})})`;
							const memberNumber = member.guild.memberCount;
							const serverName = member.guild.name;
							
							result.headline = result.headline.replace("${memberName}", memberName);
							result.headline = result.headline.replace("${memberNumber}", memberNumber);
							result.headline = result.headline.replace("${serverName}", serverName);
							
							//result.message = result.message.replace("${}" , );
							result.message = result.message.replace("${memberId}" , memberId);
							result.message = result.message.replace("${accountData}" ,accountDate );
							result.message = result.message.replace("${avatar}" , avatar);
							result.message = result.message.replace("${memberMention}", memberMention);
							result.message = result.message.replace("${memberName}", memberName);
							result.message = result.message.replace("${memberNumber}", memberNumber);
							result.message = result.message.replace("${serverName}", serverName);

							result.dm[1] = result.dm[1].replace("${memberMention}", memberMention);
							result.dm[1] = result.dm[1].replace("${memberName}", memberName);
							result.dm[1] = result.dm[1].replace("${memberNumber}", memberNumber);
							result.dm[1] = result.dm[1].replace("${serverName}", serverName);
							result.dm[1] = result.dm[1].replace("${memberId}" , memberId);
							result.dm[1] = result.dm[1].replace("${accountData}" ,accountDate );
							result.dm[1] = result.dm[1].replace("${avatar}" , avatar);
							

							// bunların varlığını kontrol eden bir kısımda yaz
							const kayıtsız = await member.guild.roles.fetch(result.role[1]);
							const yetkili = await member.guild.roles.fetch(result.role2[1]);
							const erkek = await member.guild.roles.fetch(result.role3[1]);
							const kadin = await member.guild.roles.fetch(result.role4[1]);
							const kanal2 = await member.guild.channels.fetch(result.channelId);

							//kayıt kanalı                                                                                                                                                                                                            
							const embed2 = new EmbedBuilder()

							.setTitle(result.headline)
							.setDescription(result.message)
							.setFooter({ text: `${member.user.username}`, iconURL: member.user.displayAvatarURL()})
							.setTimestamp()
							.setColor(result.color);
							
							if (result.thumbnail == true) {
							embed2.setThumbnail(member.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
							}
							if (result.image[0] == true) {
							embed2.setImage(result.image[1]);
							}

							const erkekName = erkek.name; // Rolün ismini alır
							const kadınName = kadin.name; // Rolün ismini alır
							const row = new Discord.ActionRowBuilder()
							.addComponents(
								new Discord.ButtonBuilder()
								.setLabel(erkekName)
								.setStyle(Discord.ButtonStyle.Secondary)
								.setCustomId("erkekkayit"),
								new Discord.ButtonBuilder()
								.setLabel(kadınName)
								.setStyle(Discord.ButtonStyle.Secondary)
								.setCustomId("kadinkayit")
								)
								
								await kanal2.send({embeds: [embed2], components: [row], content: "> "+`${yetkili}`+` | <@`+member.id+"> Sunucuya Giriş Yaptı."})
								if (result.otoRol == true) {
								await member.roles.add(kayıtsız)
							}
							if (result.dm[0] == true) {
								member.send({ content: result.dm[1] });
							}
						}
					}
				}// kayıt sistemi bitiş
				// onaysız bot kontrol
				if (typeof guvenlikResult !== "undefined") {
					if (guvenlikResult) {
						if (guvenlikResult.enabled == true) {
							// bot değilse geri dön
							if (!member.user.bot) return;
							if (guvenlikResult.botk == true) {
								// Botun verifikasyon durumunu kontrol et
								const flags = member.user.flags.toArray(); // Kullanıcının bayraklarını bir diziye çeviriyoruz
								const verified = flags.includes("VerifiedBot"); // Kullanıcının doğrulanmış bot olup olmadığını kontrol ediyoruz
								//let flags =  await member.user.fetchFlags();
								//let verified = await flags.has("16");
								if (!verified) {
									// Sunucunun denetim kayıtlarını al
									const log = await member.guild.fetchAuditLogs({ type: "28" });
									// Botu ekleyen kişiyi bul
									const ekleyen = log.entries.first().executor;
									
									// Botu sunucuya ekleyen kişinin sunucu sahibi olup olmadığını kontrol et
									if (member.guild.ownerId === ekleyen.id) {

										let embed = new EmbedBuilder()
										// Üst bilgiyi belirle
										.setAuthor({ name: `Sunucu :${member.guild.name}`, iconURL: member.guild.iconURL(), url: member.guild.url })
										.setTitle("ONAYSIZ BOT UYARISI")
										.setDescription(`Sunucunuza Discord tarafından doğrulanmamış **${member.user.username}** adlı botu eklediniz. Sunucunuz için tehlikeli olabilir. Lütfen dikkatli olun.`)
										.setThumbnail(member.user.displayAvatarURL())
										.setFooter({text: `Yetkili :${ekleyen.username}`, iconURL: ekleyen.displayAvatarURL()})
										.setColor("ff0000")
										ekleyen.send({ embeds: [embed] });
								} else {
									member.kick()
									let embed = new EmbedBuilder()
									.setAuthor({ name: `Sunucu :${member.guild.name}`, iconURL: member.guild.iconURL(), url: member.guild.url })
									.setTitle("ONAYSIZ BOT UYARISI")
									.setDescription(`Merhaba, bu sunucuda onaysız botların girişi engellenmektedir. Sadece sunucu sahibi botu ekleyebilir.`)
									.setThumbnail(member.user.displayAvatarURL())
									.setFooter({text: `Yetkili :${ekleyen.username}`, iconURL: ekleyen.displayAvatarURL()})
									.setColor("ff0000")
									ekleyen.send({ embeds: [embed] });
	
									// Sunucu sahibini bul
									let owner = await member.guild.fetchOwner();
	
									let embed2 = new EmbedBuilder()
									.setAuthor({ name: `Sunucu :${member.guild.name}`, iconURL: member.guild.iconURL(), url: member.guild.url })
									.setTitle("ONAYSIZ BOT UYARISI")
									.setDescription(`\n- Ekleyen kullanıcı: **${ekleyen.username} - ${ekleyen.id}**\n- Eklenen bot: **${member.user.username} - ${member.user.id}**\n- Eklenen sunucu: **${member.guild.name} - ${guildId} **\n- İşlem: **Bot sunucudan atıldı**`)
									.setThumbnail(member.user.displayAvatarURL())
									.setFooter({text: `Yetkili :${ekleyen.username}`, iconURL: ekleyen.displayAvatarURL()})
									.setColor("ff0000")
									owner.send({ embeds: [embed2] });
									}
								}	
							}
						}
					}
				}//onaysız bot kontrol bitiş
				// oto rol
				if (typeof otoRolResult !== "undefined") {
					if (otoRolResult) {
						if (otoRolResult.enabled == true) {
							if (!member.user.bot) {
								if (otoRolResult.userRol == true) {
									const user = await member.guild.roles.fetch(otoRolResult.role[1]);
									await member.roles.add(user)
								}
							}else{
								if (otoRolResult.botRol == true) {
									const bot = await member.guild.roles.fetch(otoRolResult.role2[1]);
									await member.roles.add(bot)
									}
	
							}

						}
					}
				}//otorol bitiş
			}
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