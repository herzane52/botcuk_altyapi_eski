const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const os = require("os");
const process = require("process");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("bot istatistikleri"),
    run: async (client, interaction) => 
    {
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
          function bytesToGB(bytes) {
            return (bytes / 1024 / 1024 / 1024).toFixed(2);
            }
            // Bayt cinsinden olan değerleri GB cinsine çevir
          function bytesToMB(bytes) {
            return (bytes / 1024 / 1024).toFixed(2);
          }

          // Botun gecikme süresini alın
          const ping = Math.round(client.ws.ping);

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
            // Developer bilgilerini alın
            const dev = await interaction.client.users.fetch("705752949300658217");
            const dev_avatar = dev.displayAvatarURL({
            size: 1024,
            format: "png",
            dynamic: true,
            });

            // Embed mesajını oluşturun ve gönderin
            const embed = new EmbedBuilder()
            .setAuthor({
                name: `Developer ${dev.username}`,
                iconURL: dev_avatar,
                url: `https://botcuk.com.tr/dev`,
            })
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
            .setFooter({text:`© Copyright ${client.user.username} ❤️`, iconURL: client.user.avatarURL()})
            .setColor("#b4a1bf");
            await interaction.reply({ embeds: [embed] });

    }
    
 };
