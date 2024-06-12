const logger = require("silly-logger");
const { EmbedBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');
const { mongodbUri,serverId } = require('../config.js');
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

						// değişkenler
						let message = interaction.message
						
						let kullanıcı = await  message.mentions.members.first()
						
						const erkek = await interaction.guild.roles.fetch(result.role3[1]);
						const kadın = await interaction.guild.roles.fetch(result.role4[1]);
						
						const erkekName = await erkek.name; // Rolün ismini alır
						const kadınName = await kadın.name; // Rolün ismini alır

						const kayıtsız = await interaction.guild.roles.fetch(result.role[1]);
						const kayıthg = await interaction.guild.channels.fetch(result.channelId2);
						const kayıt = await interaction.guild.channels.fetch(result.channelId2);
						const tag = await result.tag[1];
						const sembol = await result.sembol[1];

						const memberMention = `<@${kullanıcı.user.id}>`;
						const memberId = kullanıcı.id;
						const accountDate =  `<t:${Math.floor(kullanıcı.user.createdTimestamp / 1000)}> (<t:${Math.floor(kullanıcı.user.createdTimestamp / 1000)}:R>)`;
						const memberName = kullanıcı.displayName;
						const avatar = `[Tıkla](${kullanıcı.user.avatarURL({dynamic:true})})`;
						const memberNumber = kullanıcı.guild.memberCount;
						const serverName = kullanıcı.guild.name;

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

						result.headline2 = result.headline2.replace("${memberName}", memberName);
						result.headline2 = result.headline2.replace("${memberNumber}", memberNumber);
						result.headline2 = result.headline2.replace("${serverName}", serverName);
						
						//result.message = result.message.replace("${}" , );
						result.message2 = result.message2.replace("${memberId}" , memberId);
						result.message2 = result.message2.replace("${accountData}" ,accountDate );
						result.message2 = result.message2.replace("${avatar}" , avatar);
						result.message2 = result.message2.replace("${memberMention}", memberMention);
						result.message2 = result.message2.replace("${memberName}", memberName);
						result.message2 = result.message2.replace("${memberNumber}", memberNumber);
						result.message2 = result.message2.replace("${serverName}", serverName);

						if (result.age == false) {
							// yaşla kayıt kapalı ise
							if (interaction.type !== Discord.InteractionType.ModalSubmit) return;
							// erkek kayıt formu
							if (interaction.customId === 'form-erkek') 
							{
								const isim = interaction.fields.getTextInputValue('isim')
								await kullanıcı.roles.remove(kayıtsız)
								await kullanıcı.roles.add(erkek)
								if (result.tag[0] == true) {
									if (result.sembol[0] == true) {
										await kullanıcı.setNickname(`${tag} ${isim} ${sembol}`)
									}else{
										await kullanıcı.setNickname(`${tag} ${isim}`)
									}
								}else {
									if (result.sembol[0] == true) {
										await kullanıcı.setNickname(`${isim} ${sembol}`)
									}else{
										await kullanıcı.setNickname(`${isim}`)
									}
								}                                                                                                                                                                                                            
								const embed2 = new EmbedBuilder()
								.setTitle(result.headline)
								.setDescription(result.message)
								.setFooter({ text: `${kullanıcı.user.username}`, iconURL: kullanıcı.user.displayAvatarURL()})
								.setTimestamp()
								.setColor(result.color);
								if (result.thumbnail == true) {
									embed2.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image[0] == true) {
									embed2.setImage(result.image[1]);
									}
									const buton = new Discord.ActionRowBuilder()
									.addComponents(
										new Discord.ButtonBuilder()
										.setLabel(erkekName)
										.setCustomId("erkekkayit")
										.setStyle(Discord.ButtonStyle.Secondary)
										.setDisabled(true),
									)

									const embed = new EmbedBuilder()
									.setTitle(result.headline2)
									.setDescription(result.message2)
									.setFooter({ text: `${kullanıcı.user.username}`, iconURL: kullanıcı.user.displayAvatarURL()})
									.setTimestamp()
									.setColor(result.color2);
									if (result.thumbnail2 == true) {
									embed.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image2[0] == true) {
									embed.setImage(result.image2[1]);
									}

									const kayit = new EmbedBuilder()
									.setTitle("Kayıt bilgileri")
									.setDescription(`> • **${kullanıcı} Üyesi kayıt edildi!** \n\n> • **${erkek}, Rolü verildi.** \n\n> • İsmi \`${isim}\` **Olarak ayarlandı.**`)
									.setFooter({ text: `Kaydı yapan: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
									.setTimestamp()
									.setColor(result.color);
									if (result.thumbnail == true) {
										kayit.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image[0] == true) {
										kayit.setImage(result.image[1]);
									}
												

									await message.reply({embeds: [kayit]}).then(msg => {})
									await message.edit({embeds: [embed2], components: [buton],content: `${kullanıcı}`})
									await interaction.reply({ content: 'İşlem Başarılı.', ephemeral: true });
									await kayıthg.send({embeds: [embed]}).then(async m => {})
							};
							//kadın kayıt formu
							if (interaction.customId === 'form-kadin') {

								const isimk = interaction.fields.getTextInputValue('isimk')
								await kullanıcı.roles.remove(kayıtsız)
								await kullanıcı.roles.add(kadın)
								if (result.tag[0] == true) {
									if (result.sembol[0] == true) {
										await kullanıcı.setNickname(`${tag} ${isimk} ${sembol}`)
									}else{
										await kullanıcı.setNickname(`${tag} ${isimk}`)
									}
								}else {
									if (result.sembol[0] == true) {
										await kullanıcı.setNickname(`${isimk} ${sembol}`)
									}else{
										await kullanıcı.setNickname(`${isimk}`)
									}
								}                                                                                                                                                                                                            
								const embed2 = new EmbedBuilder()
								.setTitle(result.headline)
								.setDescription(result.message)
								.setFooter({ text: `${kullanıcı.user.username}`, iconURL: kullanıcı.user.displayAvatarURL()})
								.setTimestamp()
								.setColor(result.color);

								if (result.thumbnail == true) {
									embed2.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image[0] == true) {
									embed2.setImage(result.image[1]);
									}

							const buton = new Discord.ActionRowBuilder()
							  .addComponents(
								new Discord.ButtonBuilder()
								  .setLabel(kadınName)
								  .setCustomId("kadinkayit")
								  .setStyle(Discord.ButtonStyle.Secondary)
								  .setDisabled(true),
							  )

							  const embed = new EmbedBuilder()
									.setTitle(result.headline2)
									.setDescription(result.message2)
									.setFooter({ text: `${kullanıcı.user.username}`, iconURL: kullanıcı.user.displayAvatarURL()})
									.setTimestamp()
									.setColor(result.color2);
									if (result.thumbnail2 == true) {
									embed.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image2[0] == true) {
									embed.setImage(result.image2[1]);
									}
									const kayit = new EmbedBuilder()
									.setTitle("Kayıt bilgileri")
									.setDescription(`> • **${kullanıcı} Üyesi kayıt edildi!** \n\n> • **${kadın}, Rolü verildi.** \n\n> • İsmi \`${isimk}\` **Olarak ayarlandı.**`)
									.setFooter({ text: `Kaydı yapan: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
									.setTimestamp()
									.setColor(result.color);
									if (result.thumbnail == true) {
										kayit.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image[0] == true) {
										kayit.setImage(result.image[1]);
									}			  
							
									message.reply({embeds: [kayit]}).then(msg => {})
									message.edit({embeds: [embed2], components: [buton],content: `${kullanıcı}`})
									await interaction.reply({ content: 'İşlem Başarılı.', ephemeral: true });
									await kayıthg.send({embeds: [embed]}).then(async m => {})
							
							  };

				  } if (result.age == true) {
					// yaşla kayıt  açık ise 

					if (interaction.type !== Discord.InteractionType.ModalSubmit) return;
							// erkek kayıt formu
							if (interaction.customId === 'form-erkek') 
							{
								const isim = interaction.fields.getTextInputValue('isim')
								const yas = interaction.fields.getTextInputValue('yas')

								await kullanıcı.roles.remove(kayıtsız)
								await kullanıcı.roles.add(erkek)
								if (result.tag[0] == true) {
									if (result.sembol[0] == true) {
										await kullanıcı.setNickname(`${tag} ${isim} ${sembol} ${yas}`)
									}else{
										await kullanıcı.setNickname(`${tag} ${isim} ${yas}`)
									}
								}else {
									if (result.sembol[0] == true) {
										await kullanıcı.setNickname(`${isim} ${sembol} ${yas}`)
									}else{
										await kullanıcı.setNickname(`${isim} ${yas}`)
									}
								}                                                                                                                                                                                                            
								const embed2 = new EmbedBuilder()
								.setTitle(result.headline)
								.setDescription(result.message)
								.setFooter({ text: `${kullanıcı.user.username}`, iconURL: kullanıcı.user.displayAvatarURL()})
								.setTimestamp()
								.setColor(result.color);
								if (result.thumbnail == true) {
									embed2.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image[0] == true) {
									embed2.setImage(result.image[1]);
									}
									const buton = new Discord.ActionRowBuilder()
									.addComponents(
										new Discord.ButtonBuilder()
										.setLabel(erkekName)
										.setCustomId("erkekkayit")
										.setStyle(Discord.ButtonStyle.Secondary)
										.setDisabled(true),
									)

									const embed = new EmbedBuilder()
									.setTitle(result.headline2)
									.setDescription(result.message2)
									.setFooter({ text: `${kullanıcı.user.username}`, iconURL: kullanıcı.user.displayAvatarURL()})
									.setTimestamp()
									.setColor(result.color2);
									if (result.thumbnail2 == true) {
									embed.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image2[0] == true) {
									embed.setImage(result.image2[1]);
									}

									const kayit = new EmbedBuilder()
									.setTitle("Kayıt bilgileri")
									.setDescription(`> • **${kullanıcı} Üyesi kayıt edildi!** \n\n> • **${erkek}, Rolü verildi.** \n\n> • İsmi \`${isim}\` **Olarak ayarlandı.**`)
									.setFooter({ text: `Kaydı yapan: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
									.setTimestamp()
									.setColor(result.color);
									if (result.thumbnail == true) {
										kayit.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image[0] == true) {
										kayit.setImage(result.image[1]);
									}
												

									await message.reply({embeds: [kayit]}).then(msg => {})
									await message.edit({embeds: [embed2], components: [buton],content: `${kullanıcı}`})
									await interaction.reply({ content: 'İşlem Başarılı.', ephemeral: true });
									await kayıthg.send({embeds: [embed]}).then(async m => {})
							};
							//kadın kayıt formu
							if (interaction.customId === 'form-kadin') {
								const isimk = interaction.fields.getTextInputValue('isimk')
								const yask = interaction.fields.getTextInputValue('yask')
								await kullanıcı.roles.remove(kayıtsız)
								await kullanıcı.roles.add(kadın)
								if (result.tag[0] == true) {
									if (result.sembol[0] == true) {
										await kullanıcı.setNickname(`${tag} ${isimk} ${sembol} ${yask} `)
									}else{
										await kullanıcı.setNickname(`${tag} ${isimk} ${yask}`)
									}
								}else {
									if (result.sembol[0] == true) {
										await kullanıcı.setNickname(`${isimk} ${sembol} ${yask}`)
									}else{
										await kullanıcı.setNickname(`${isimk} ${yask}`)
									}
								}                                                                                                                                                                                                            
								const embed2 = new EmbedBuilder()
								.setTitle(result.headline)
								.setDescription(result.message)
								.setFooter({ text: `${kullanıcı.user.username}`, iconURL: kullanıcı.user.displayAvatarURL()})
								.setTimestamp()
								.setColor(result.color);

								if (result.thumbnail == true) {
									embed2.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image[0] == true) {
									embed2.setImage(result.image[1]);
									}

							const buton = new Discord.ActionRowBuilder()
							  .addComponents(
								new Discord.ButtonBuilder()
								  .setLabel(kadınName)
								  .setCustomId("kadinkayit")
								  .setStyle(Discord.ButtonStyle.Secondary)
								  .setDisabled(true),
							  )

							  const embed = new EmbedBuilder()
									.setTitle(result.headline2)
									.setDescription(result.message2)
									.setFooter({ text: `${kullanıcı.user.username}`, iconURL: kullanıcı.user.displayAvatarURL()})
									.setTimestamp()
									.setColor(result.color2);
									if (result.thumbnail2 == true) {
									embed.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image2[0] == true) {
									embed.setImage(result.image2[1]);
									}
									const kayit = new EmbedBuilder()
									.setTitle("Kayıt bilgileri")
									.setDescription(`> • **${kullanıcı} Üyesi kayıt edildi!** \n\n> • **${kadın}, Rolü verildi.** \n\n> • İsmi \`${isimk}\` **Olarak ayarlandı.**`)
									.setFooter({ text: `Kaydı yapan: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
									.setTimestamp()
									.setColor(result.color);
									if (result.thumbnail == true) {
										kayit.setThumbnail(kullanıcı.displayAvatarURL({ size: 512, format: 'png', dynamic: true }));
									}
									if (result.image[0] == true) {
										kayit.setImage(result.image[1]);
									}			  
							
									message.reply({embeds: [kayit]}).then(msg => {})
									message.edit({embeds: [embed2], components: [buton],content: `${kullanıcı}`})
									await interaction.reply({ content: 'İşlem Başarılı.', ephemeral: true });
									await kayıthg.send({embeds: [embed]}).then(async m => {})
							
							  };
							}//kayıt sistemi bitiş
						}
					}
				}
			}
		}
	}
	catch (err) {
		logger.error(err);
		await interaction.reply({ content: `
Malesef sistemsel bir hata oluştu geliştirici ile görüşünüz.
hata bilgisi
\`\`\`js\n${err}\n\`\`\``, ephemeral: true });
	}
},
};

