const logger = require('silly-logger');
const { ActivityType } = require('discord.js');
const config = require('../config.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'disconnect',
	once: true,
	async execute(client) {
// Seçili kanalın ID'sini config dosyasından al
const channel = client.channels.cache.get(config.durum);
const embed = new EmbedBuilder()
					.setTitle("Bağlantı koptu")
					.setDescription(`Bot şuanda çevrim dışı.`)
					.setColor("#ff0000")
					.setThumbnail(client.avatarURL())
					await channel.send({embeds: [embed]})
	},
};