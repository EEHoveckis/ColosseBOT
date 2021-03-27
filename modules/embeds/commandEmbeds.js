const Discord = require("discord.js");
const { colorGreen, eightBallThumbnail, botWebsite } = require("../files/config.js");

module.exports = function(client, message, data, command, otherArgs) {
	const { variousStrings } = require(`../files/wordbanks/wordbanks${data.language}.js`);
	switch (command) {
		case "8ball":
			const ballEmbed = new Discord.MessageEmbed()
				.setAuthor(`⋙ ${client.user.username} || 8Ball ⋘`, "", botWebsite)
				.setColor(colorGreen)
				.addField(variousStrings.question, otherArgs.question)
				.addField(variousStrings.answer, otherArgs.reply)
				.setFooter(variousStrings.providedBy.replace("%provider%", "ColosseBOT"), eightBallThumbnail);

			message.channel.send(ballEmbed);
			break;
	}
};
