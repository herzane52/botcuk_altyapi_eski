const {ButtonBuilder,ButtonStyle,ActionRowBuilder, EmbedBuilder } = require('discord.js');
const logger = require('silly-logger');

module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(guild) {
		try {
			const client = guild.client; // botun client nesnesini al
			const kendiSunucum = client.guilds.cache.get(`792839772980772876`); // kendi sunucunun id'sini ver
			const kanal2 = kendiSunucum.channels.cache.get(`1071739652966449253`); // kendi sunucundaki kanalın id'sini ver                                                                                                                                                                                                         
					const embed2 = new EmbedBuilder()
                    .setThumbnail(guild.iconURL({ size: 512, format: 'png', dynamic: true }))
					.setTitle('Yeni Bir Sunucuya eklendim!')
					.addFields({name:'Sunucunun İsmi', value: `${guild.name}`})
					.addFields({name:'Sunucunun ID\'si', value: `${guild.id}`})
					.addFields({name:'Sunucunun Sahibi', value: `<@${guild.ownerId}> - ${guild.ownerId} [DM](https://discord.com/channels/@me/${guild.ownerId})`})
					.addFields({name:'Sunucunun Dili', value: `${getFlagEmoji(guild.preferredLocale)}`})
					.addFields({name:'Sunucunun Kullanıcı Sayısı', value: `${guild.memberCount}`})
					.addFields({name:'Botun Yeni Sunucu Sayısı', value: `${client.guilds.cache.size}`})
					.addFields({name:'Botun Yeni Kullanıcı Sayısı', value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`})
                    .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL()})
                    .setTimestamp()
                    .setColor("0000ff");

					const row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
						.setLabel(`DAVET`)
						.setStyle(ButtonStyle.Primary)
						.setCustomId("davet"),
						new ButtonBuilder()
						.setLabel(`KARA LİSTE`)
						.setStyle(ButtonStyle.Danger)
						.setCustomId("liste"),
						new ButtonBuilder()
						.setLabel(`AYRIL`)
						.setStyle(ButtonStyle.Secondary)
						.setCustomId("ayrıl")
						)
							await kanal2.send({components: [row] ,embeds: [embed2],content: `${guild.id}`})
											
							
						// sunucu diline göre bayrak emojisi döndüren fonksiyon

											
						function getFlagEmoji(locale) {
						if (!guild.features.includes('COMMUNITY')) {
						  return '❓Ayarlanmamış'; // topluluk sunucusu olmayanlar için varsayılan değer
						}
						switch (locale) {
							case 'tr':
							  return '🇹🇷 Türkçe';
							case 'en':
							  return '🇬🇧 İngilizce';
							case 'fr':
							  return '🇫🇷 Fransızca';
							case 'de':
							  return '🇩🇪 Almanca';
							case 'es':
							  return '🇪🇸 İspanyolca';
							case 'ar':
							  return '🇸🇦 Arapça';
							case 'zh':
							  return '🇨🇳 Çince';
							case 'ru':
							  return '🇷🇺 Rusça';
							case 'pt':
							  return '🇵🇹 Portekizce';
							case 'it':
							  return '🇮🇹 İtalyanca';
							case 'hi':
							  return '🇮🇳 Hintçe';
							case 'ja':
							  return '🇯🇵 Japonca';
							case 'ko':
							  return '🇰🇷 Korece';
							case 'nl':
							  return '🇳🇱 Hollandaca';
							case 'pl':
							  return '🇵🇱 Lehçe';
							case 'sv':
							  return '🇸🇪 İsveççe';
							case 'el':
							  return '🇬🇷 Yunanca';
							case 'he':
							  return '🇮🇱 İbranice';
							case 'fa':
							  return '🇮🇷 Farsça';
							case 'th':
							  return '🇹🇭 Tayca';
							case 'vi':
							  return '🇻🇳 Vietnamca';
							case 'id':
							  return '🇮🇩 Endonezyaca';
							case 'ro':
							  return '🇷🇴 Romence';
							case 'hu':
							  return '🇭🇺 Macarca';
							case 'cs':
							  return '🇨🇿 Çekçe';
							case 'fi':
							  return '🇫🇮 Fince';
							case 'da':
							  return '🇩🇰 Danca';
							case 'no':
							  return 'Norveşçe';
							default:
								return '🇬🇧 İngilizce';//varsayılan değer ingilizce
						  }
					  }
		}
		catch (err) {
			logger.error(err);
		}
	},
};

