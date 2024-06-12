
const { ActivityType } = require('discord.js');
const logger = require('silly-logger');
const config = require('../config.js');
const { EmbedBuilder } = require('discord.js');
const os = require("os");
const process = require("process");
const readline = require('readline');


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) 
	{
		setTimeout(async() => 
		{
			function updateInfo () 
			{
				// botun pingini ve kullandığı RAM miktarını al
				const ping = client.ws.ping;
				const totalMemory = os.totalmem();
				const usedMemory = os.totalmem() - os.freemem();

				const memoryUsage = process.memoryUsage();
				const allocatedMemory = memoryUsage.heapTotal;
				const usedMemory2 = memoryUsage.heapUsed;

				// Bayt cinsinden olan değerleri GB cinsine çevir
				function bytesToGB(bytes) {
					return (bytes / 1024 / 1024 / 1024).toFixed(2);
				}
				// Bayt cinsinden olan değerleri GB cinsine çevir
				function bytesToMB(bytes) {
					return (bytes / 1024 / 1024).toFixed(2);
				}
				// son satırı sil
				readline.clearLine(process.stdout, 0);
				readline.cursorTo(process.stdout, 0);
			
				// konsola bu bilgileri yaz
				process.stdout.write(`                                    Ping: ${ping} ms, ${bytesToGB(usedMemory)}/${bytesToGB(totalMemory)} GB  ${bytesToMB(usedMemory2)}/${bytesToMB(allocatedMemory)} MB`);
			}
			// bu fonksiyonu her saniye çağır
			setInterval (updateInfo, 1000);
		}, 15000);

	 	setInterval(function () 
		{

			// otomatik bot durumu
			var randomMesajlar = 
			[
				`${client.guilds.cache.size} Server | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} User`,
				`www.botcuk.com.tr`,
					
			];
	
			var randomMesajlar1 =
		  	randomMesajlar[Math.floor(Math.random() * randomMesajlar.length)];
	
			client.user.setActivity(`${randomMesajlar1}`);
	 	}, 1000 * 12);


	  	
	  	//işletim sistemi bilgileri
		const osVersion = os.version();
		// ram bilgileri
		const totalMemory = os.totalmem();
		const usedMemory = os.totalmem() - os.freemem();
		const freememMemory = os.freemem();
	  
		const memoryUsage = process.memoryUsage();// proje için ayrılan ram
		const allocatedMemory = memoryUsage.heapTotal;// kullanılan
		const usedMemory2 = memoryUsage.heapUsed;// toplam
	  
		// Bayt cinsinden olan değerleri GB cinsine çevir
		function bytesToGB(bytes) 
		{
			return (bytes / 1024 / 1024 / 1024).toFixed(2);
		}
		// Bayt cinsinden olan değerleri GB cinsine çevir
		function bytesToMB(bytes) 
		{
			return (bytes / 1024 / 1024).toFixed(2);
		}



		// Sistem ramının doluluk oranını yüzde olarak hesaplayın
		const percent = Math.round((usedMemory / totalMemory) * 100);

		// Proje ramının kalan ram miktarına oranını yüzde olarak hesaplayın
		const percent2 = Math.round((usedMemory2 / (usedMemory2+os.freemem())) * 100);


		// Ram kullanımını emoji barlarını kullanarak gösterme
		let bars = '';
		if (percent == 0) {
		  bars = '<:bs:1195506612136321126><:bo:1195506609280004107><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // Tüm barlar boş olsun
		} else if (percent > 0 && percent <= 10) {
		  // Eğer yüzde 0 ile 10 arasındaysa
		  bars = '<a:ys:1195506626753462343><:bo:1195506609280004107><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk bar dolu olsun
		} else if (percent > 10 && percent <= 20) {
		  // Eğer yüzde 10 ile 20 arasındaysa
		  bars = '<a:ds:1195506619530870784><:bo:1195506609280004107><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk iki bar dolu olsun
		} else if (percent > 20 && percent <= 30) {
		  // Eğer yüzde 20 ile 30 arasındaysa
		  bars = '<a:ds:1195506619530870784><a:yo:1195506625562280126><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk üç bar dolu olsun
		} else if (percent > 30 && percent <= 40) {
		  // Eğer yüzde 30 ile 40 arasındaysa
		  bars = '<a:ds:1195506619530870784><a:do:1195506617966411907><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk dört bar dolu olsun
		} else if (percent > 40 && percent <= 50) {
		  // Eğer yüzde 40 ile 50 arasındaysa
		  bars = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:yo:1195506625562280126><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk beş bar dolu olsun
		} else if (percent > 50 && percent <= 60) {
		  // Eğer yüzde 50 ile 60 arasındaysa
		  bars = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk altı bar dolu olsun
		} else if (percent > 60 && percent <= 70) {
		  // Eğer yüzde 60 ile 70 arasındaysa
		  bars = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><a:yo:1195506625562280126><:bsg:1195506614455767090>'; // İlk yedi bar dolu olsun
		} else if (percent > 70 && percent <= 80) {
		  // Eğer yüzde 70 ile 80 arasındaysa
		  bars = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><a:do:1195506617966411907><:bsg:1195506614455767090>'; // İlk sekiz bar dolu olsun
		} else if (percent > 80 && percent <= 90) {
		  // Eğer yüzde 80 ile 90 arasındaysa
		  bars = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><a:do:1195506617966411907><a:ysg:1195506630587076648>'; // İlk dokuz bar dolu olsun
		} else if (percent > 90 && percent <= 100) {
		  // Eğer yüzde 90 ile 100 arasındaysa
		  bars = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><a:do:1195506617966411907><a:dsg:1195506622596911154>'; // Tüm barlar dolu olsun
		}

		let bars2 = '';
		if (percent2 == 0) {
		  bars2 = '<:bs:1195506612136321126><:bo:1195506609280004107><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // Tüm barlar boş olsun
		} else if (percent2 > 0 && percent2 <= 10) {
		  // Eğer yüzde 0 ile 10 arasındaysa
		  bars2 = '<a:ys:1195506626753462343><:bo:1195506609280004107><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk bar dolu olsun
		} else if (percent2 > 10 && percent2 <= 20) {
		  // Eğer yüzde 10 ile 20 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><:bo:1195506609280004107><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk iki bar dolu olsun
		} else if (percent2 > 20 && percent2 <= 30) {
		  // Eğer yüzde 20 ile 30 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><a:yo:1195506625562280126><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk üç bar dolu olsun
		} else if (percent2 > 30 && percent2 <= 40) {
		  // Eğer yüzde 30 ile 40 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><a:do:1195506617966411907><:bo:1195506609280004107><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk dört bar dolu olsun
		} else if (percent2 > 40 && percent2 <= 50) {
		  // Eğer yüzde 40 ile 50 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:yo:1195506625562280126><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk beş bar dolu olsun
		} else if (percent2 > 50 && percent2 <= 60) {
		  // Eğer yüzde 50 ile 60 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><:bo:1195506609280004107><:bsg:1195506614455767090>'; // İlk altı bar dolu olsun
		} else if (percent2 > 60 && percent2 <= 70) {
		  // Eğer yüzde 60 ile 70 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><a:yo:1195506625562280126><:bsg:1195506614455767090>'; // İlk yedi bar dolu olsun
		} else if (percent2 > 70 && percent2 <= 80) {
		  // Eğer yüzde 70 ile 80 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><a:do:1195506617966411907><:bsg:1195506614455767090>'; // İlk sekiz bar dolu olsun
		} else if (percent2 > 80 && percent2 <= 90) {
		  // Eğer yüzde 80 ile 90 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><a:do:1195506617966411907><a:ysg:1195506630587076648>'; // İlk dokuz bar dolu olsun
		} else if (percent2 > 90 && percent2 <= 100) {
		  // Eğer yüzde 90 ile 100 arasındaysa
		  bars2 = '<a:ds:1195506619530870784><a:do:1195506617966411907><a:do:1195506617966411907><a:do:1195506617966411907><a:dsg:1195506622596911154>'; // Tüm barlar dolu olsun
		}

	  	client.user.setStatus("online");

		setTimeout(async() => 
		{
			// Botun gecikme süresini alın
			const ping = Math.round(client.ws.ping);
			// Seçili kanalın ID'sini config dosyasından al
			const channel = client.channels.cache.get(config.durum);
			const embed = new EmbedBuilder()
			.setTitle("<a:emoji_38:995741599969583144> Bağlantı bilgileri")

			.addFields({ name: ' **Sunucu Sayısı**', value: `${client.guilds.cache.size}`, inline: true})
			.addFields({ name: ' **Kullanıcı Sayısı**', value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, inline: true})
			.addFields({ name: ' **Kanal Sayısı**', value: `${client.channels.cache.size}`, inline: true})
			.addFields({ name: ' **Node.js Sürümü**', value: `${process.version}`, inline: true})
			.addFields({ name: ' **Gecikme süresi**', value: `${ping} ms`, inline: true})
			.addFields({ name: ' **İşletim Sistemi**', value: `${osVersion}`, inline: false})
			.addFields({ name: ' **İşlemci**', value: `${os.cpus().map(i => `${i.model}`)[0]}`, inline: false})
			.addFields({ 
				name: ' **Sistem Kaynak kullanımı**',
				value: `   ${bytesToGB(usedMemory)} / ${bytesToGB(totalMemory)} **GB** \n${bars}(%${percent})`,
				inline: true})
			.addFields({ 
				name: ' **Bot Kaynak kullanımı**',
				value: `${bytesToMB(usedMemory2)} / ${bytesToMB(freememMemory+usedMemory2)} **MB** \n ${bars2}(%${percent2})`,
				inline: true})		
			.setFooter({
				text:`© Copyright ${client.user.username} ❤️`,
				iconURL: client.user.avatarURL(),
			})
			.setColor("#b4a1bf");

			await channel.send({embeds: [embed]})
		}, 1000 * 60);
					

		logger.success(`Discord bağlantısı başarılı.`);
		logger.success(`Giriş ismi \"${client.user.username}\"  Sunucular \"${client.guilds.cache.size}\" Kullanıcılar \"${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\"`);


	},
};


