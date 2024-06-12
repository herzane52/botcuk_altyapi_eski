const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yardım")
    .setDescription("yardım bilgileri."),
    run: async (client, interaction) => {
      const year = new Date().getFullYear();

      const dev = await interaction.client.users.fetch('705752949300658217');
      const dev_avatar = dev.displayAvatarURL({ size: 1024, format: 'png', dynamic: true });
    
     const embed = new EmbedBuilder()
    .setAuthor({ name: `Developer ${dev.username}`, iconURL: dev_avatar, url: `https://botcuk.com.tr/dev` })
    .setDescription(`
    **Botçuk sunucunuzu tehliklere karşı koruyabilir ve bu tehlikelere karşı sizi uyarabilir, kayıt işlemlerinizi otomatikleştirebilir veya moderatörlerinizin görevlerini destekleyebilir.**

    [WEB PANEL](https://botcuk.com.tr/dashboard)
    Botçuk'un birçok özelliğini web paneli aracılığıyla basitçe ayarlayabilir ve yönetebilirsiniz.

    [DESTEK SUNUCUSU](https://botcuk.com.tr/support)
    Herhangi bir sorun, öneri veya şikayetiniz varsa, destek sunucumuza  katılabilirsiniz.

    [DAVET ET](https://discord.com/oauth2/authorize?client_id=999282811322253373&scope=bot&permissions=8)
    Botçuk'u sunucunuza davet etmek için buraya tıklayabilirsiniz.

    [OY VER](https://top.gg/bot/999282811322253373/vote)
    Botçuk'a oy vererek daha büyük kitlelere ulaşmasını sağlayabilirsiniz.
    `)
    .setTitle("TÜM AYARLAR WEB PANEL ÜZERİNDEN YAPILMAKTADIR")
    .setFooter({text:`© Copyright ${client.user.username} ${year} ❤️`, iconURL: client.user.avatarURL()})
    .setColor("#b4a1bf");
    await interaction.reply({ embeds: [embed] });

    }
    
 };
