const { EmbedBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');
const logger = require('silly-logger');
const { mongodbUri ,config } = require('../config.js');

const dbClient = new MongoClient(String(mongodbUri));

module.exports = {
	name: 'messageCreate',
	execute: async(message) => {
    // dm mesajı ise geri dön
    if (message.channel.type === 'dm') return;
    // botsada geri dön
    if (message.author.bot) return;

    const guildId = await message.guild.id;
		const filter = {
			_id: guildId,
		};
		try 
    {
			await dbClient.connect();
			const db = dbClient.db("botcuk");
			const otoYanitCollection = db.collection("otoYanit");
      const botCollection = db.collection("ozelBot");
			const botResult = await botCollection.findOne(filter);
			const otoYanitResult = await otoYanitCollection.findOne(filter);
      
      // botResult değerinin var olup olmadığını kontrol et
			if (typeof botResult !== "undefined") {
			//varsa
			if (botResult) {
				// Özel bot açıksa geri dön
				if (botResult.enabled == true) return;
			//yoksa
			} else {
				// selam alma
        if (typeof otoYanitResult !== "undefined") {
          if (otoYanitResult) {
            if (otoYanitResult.enabled == true) {
              if(otoYanitResult.selam == true) {
                let selaamlar = message.content.toLowerCase()  
                if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'selam'||   selaamlar === 'selamün aleyküm' || selaamlar === 'selamın aleykum')
                {
                  message.channel.sendTyping();
                  const memberMention = `<@${message.author.id}>`;
                  const memberId = message.author.id;
                  const memberName = message.author.displayName;

                  otoYanitResult.message = otoYanitResult.message.replace("${memberId}" , memberId);
                  otoYanitResult.message = otoYanitResult.message.replace("${memberMention}", memberMention);
                  otoYanitResult.message = otoYanitResult.message.replace("${memberName}", memberName);
                  
                  await message.channel.sendTyping();
                  setTimeout(async() => 
                  {
                    // mesajı gönder
                    await message.reply(otoYanitResult.message);
                  }, 5000);  
                }
              }
            }
          }
        }//selam alma bitiş
      }
    }
  }
  catch (err) {

    //logger.error(err);
    const channel = message.channels.cache.get(config.hata);
    await channel.channel.send(`Sistem hatası ${err.stack}.js
    hata bilgisi
    \`\`\`js\n${err}\n\`\`\`
    `);
  }
}
};
