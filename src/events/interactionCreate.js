const { InteractionType } = require("discord.js");
const logger = require("silly-logger");

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
         let client = interaction.client;
   	 if (interaction.type == InteractionType.ApplicationCommand) {
   	 if(interaction.user.bot) return;
	try {
         const command = client.slashcommands.get(interaction.commandName)
         command.run(client, interaction)
	} catch (e) {
        console.error(e)
	interaction.reply({content: `Bu komut yürütülürken bir hata oluştu!\nDestek Sunucusuna katılın ve bize hata mesajını gönderin:\n \`\`\`js\n ${JSON.stringify(interaction.commandName, null, 4)} \`\`\` \`\`\`js\n${error}\`\`\` \n https://botcuk.com.tr/support`, ephemeral: true});
	}
	 }
  }}