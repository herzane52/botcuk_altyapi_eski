const logger = require("silly-logger");
const { EmbedBuilder ,PermissionFlagsBits } = require('discord.js');
const { MongoClient } = require('mongodb');
const { mongodbUri,serverId, config } = require('../config.js');
const Discord = require("discord.js");

const dbClient = new MongoClient(String(mongodbUri));


module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		const guildId = await interaction.guild.id;
		const filter = {
			_id: guildId,
		};
		try {
			await dbClient.connect();
			const db = dbClient.db("botcuk");
			const collection = db.collection("kayit");
            const botCollection = db.collection("ozelBot");
			const result = await collection.findOne(filter);
            const botResult = await botCollection.findOne(filter);
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
								const yetkili = await interaction.guild.roles.fetch(result.role2[1]);
								if (result.age == false) {
								const modal = new Discord.ModalBuilder()
									//erkek
									.setCustomId('form-erkek')
									.setTitle('BOTÇUK - KAYIT SİSTEMİ')
									const a1 = new Discord.TextInputBuilder()
									.setCustomId('isim')
									.setLabel('İsim')
									.setStyle(Discord.TextInputStyle.Short) 
									.setMinLength(3)
									.setMaxLength(30)
									.setPlaceholder('Arda')
									.setRequired(true)
									const row3 = new Discord.ActionRowBuilder().addComponents(a1);
									modal.addComponents(row3);
					
									// kadın kayıt formu
									const modalk = new Discord.ModalBuilder()
					
									.setCustomId('form-kadin')
									.setTitle('BOTÇUK - KAYIT SİSTEMİ')
									const k1 = new Discord.TextInputBuilder()
									.setCustomId('isimk')
									.setLabel('İsim')
									.setStyle(Discord.TextInputStyle.Short) 
									.setMinLength(3)
									.setMaxLength(30)
									.setPlaceholder('Elif')
									.setRequired(true)
									const row4 = new Discord.ActionRowBuilder().addComponents(k1);
									modalk.addComponents(row4);


									if (!interaction.isButton()) return;
									// rolleri yönetme yetkisi olmayan kullanıcılar için mesaj
									const yetkiMesaj = `BUTONU KULLANMAK İÇİN \`YÖNETİCİ\` İZNİNE VEYA ${yetkili} ROLÜNE İHTİYACINIZ VAR.`;
									
									if (interaction.customId === "erkekkayit") {
									// erkek kayıt butonuna basan kullanıcılar için
									if (interaction.member.permissions.has("8") || interaction.member.roles.cache.has(yetkili.id) ) {
										// rolleri yönetme izni varsa modalErkek'i göster
										await interaction.showModal(modal);
									} else {
									// rolleri yönetme izni yoksa mesaj gönder
										await interaction.deferReply({ ephemeral: true }); // etkileşimi ertele
										await interaction.editReply({ content: "Yüksek ping değeri lütfen bekleyin", ephemeral: true }); // etkileşimi güncelle
										await interaction.editReply({ content: yetkiMesaj, ephemeral: true });
									}
									} 
									if (interaction.customId === "kadinkayit") {
									// kadın kayıt butonuna basan kullanıcılar için
									if (interaction.member.permissions.has("8") || interaction.member.roles.cache.has(yetkili.id) ) {
										// rolleri yönetme izni varsa modalkadını'i göster
										await interaction.showModal(modalk);
									} else {
										// rolleri yönetme izni yoksa mesaj gönder
										await interaction.editReply({ content: "lütfen bekleyin", ephemeral: true }); // etkileşimi güncelle
										await interaction.deferReply({ ephemeral: true }); // etkileşimi ertele
										await interaction.editReply({ content: yetkiMesaj, ephemeral: true });
									}
									}
								};
								if (result.age == true) {
									const modal = new Discord.ModalBuilder()

									.setCustomId('form-erkek')
									.setTitle('BOTÇUK - KAYIT SİSTEMİ')
									const a1 = new Discord.TextInputBuilder()
									.setCustomId('isim')
									.setLabel('İsim')
									.setStyle(Discord.TextInputStyle.Short) 
									.setMinLength(3)
									.setMaxLength(30)
									.setPlaceholder('Polat')
									.setRequired(true)
									// yaş kısmı
									const a2 = new Discord.TextInputBuilder()
									.setCustomId('yas')
									.setLabel('Yaş')
									.setStyle(Discord.TextInputStyle.Short) 
									.setMinLength(1)
									.setMaxLength(2)
									.setPlaceholder('30')
									.setRequired(true)
									const row3 = new Discord.ActionRowBuilder().addComponents(a1); // iki bileşeni de aynı satıra ekliyoruz
									const row4 = new Discord.ActionRowBuilder().addComponents(a2); // ikinci bileşeni ikinci
									modal.addComponents(row3, row4);
								
									// kadın kayıt formu
									const modalk = new Discord.ModalBuilder()
								
									.setCustomId('form-kadin')
									.setTitle('BOTÇUK - KAYIT SİSTEMİ')
									const k1 = new Discord.TextInputBuilder()
									.setCustomId('isimk')
									.setLabel('İsim')
									.setStyle(Discord.TextInputStyle.Short) 
									.setMinLength(3)
									.setMaxLength(30)
									.setPlaceholder('Elif')
									.setRequired(true)
									// yaş kısmını buraya da ekliyoruz
									const k2 = new Discord.TextInputBuilder()
									.setCustomId('yask')
									.setLabel('Yaş')
									.setStyle(Discord.TextInputStyle.Short) 
									.setMinLength(1)
									.setMaxLength(2)
									.setPlaceholder('24')
									.setRequired(true)
									const row5 = new Discord.ActionRowBuilder().addComponents(k1);
									const row6 = new Discord.ActionRowBuilder().addComponents(k2);
									modalk.addComponents(row5, row6);

									if (!interaction.isButton()) return;
									// rolleri yönetme yetkisi olmayan kullanıcılar için mesaj
									const yetkiMesaj = `BUTONU KULLANMAK İÇİN \`YÖNETİCİ\` İZNİNE VEYA ${yetkili} ROLÜNE İHTİYACINIZ VAR.`;
									
									if (interaction.customId === "erkekkayit") {
										// erkek kayıt butonuna basan kullanıcılar için
										if (interaction.member.permissions.has("8") || interaction.member.roles.cache.has(yetkili.id) ) {
										// rolleri yönetme izni varsa modalErkek'i göster
										await interaction.showModal(modal);
										} else {
										// rolleri yönetme izni yoksa mesaj gönder
										await interaction.deferReply({ ephemeral: true }); // etkileşimi ertele
										await interaction.editReply({ content: "Yüksek ping değeri lütfen bekleyin", ephemeral: true }); // etkileşimi güncelle
										await interaction.editReply({ content: yetkiMesaj, ephemeral: true });
										}
									} 
									if (interaction.customId === "kadinkayit") {
										// kadın kayıt butonuna basan kullanıcılar için
										if (interaction.member.permissions.has("8") || interaction.member.roles.cache.has(yetkili.id) ) {
										// rolleri yönetme izni varsa modalkadını'i göster
										await interaction.showModal(modalk);
										} else {
											// rolleri yönetme izni yoksa mesaj gönder
											await interaction.editReply({ content: "lütfen bekleyin", ephemeral: true }); // etkileşimi güncelle
											await interaction.deferReply({ ephemeral: true }); // etkileşimi ertele
											await interaction.editReply({ content: yetkiMesaj, ephemeral: true });
										}
									}
								}//kayıt sistemi bitiş
							}
						}
					}
				}
			}
		}
		catch (err) {
			//logger.error(err);
			await interaction.reply({ content: `
			Malesef sistemsel bir hata oluştu geliştirici ile görüşünüz.
			hata bilgisi
			\`\`\`js\n${err}\n\`\`\``, ephemeral: true });

			const channel = interaction.channels.cache.get(config.hata);
			await channel.channel.send(`Sistem hatası ${err.stack}.js
			hata bilgisi
			\`\`\`js\n${err}\n\`\`\`
			`);
		}
},
};
