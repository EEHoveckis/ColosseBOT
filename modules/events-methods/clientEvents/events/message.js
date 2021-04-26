const antiLang = require("../../antiLang/antiLang.js");
const antiSpam = require("../../antiSpam/antiSpam.js");
const botStats = require("../../dataMethods/botStats.js");
const checkCommand = require("../../commandMethods/checkCommand.js");
const getGuildData = require("../../dataMethods/getGuildData.js");
const getUserData = require("../../dataMethods/getUserData.js");
const userEconomy = require("../../dataMethods/userEconomy.js");

module.exports = {
	name: "message",
	execute(message, client, database, usersMap) {
		if (message.author.bot) return;
		botStats(database, "messages");
		if (message.channel.type == "text") {
			getGuildData(database, message.guild.id).then(guildData => {
				getUserData(database, message.author.id).then(userData => {
					if (message.member.roles.cache.has(guildData.muteRole)) return message.delete();
					if (antiLang(client, database, guildData, userData, message) == true && guildData.punishmentLevel > 0) return;
					if (antiSpam(client, database, guildData, userData, usersMap, message) == true && guildData.punishmentLevel > 0) return;
					checkCommand(client, message, database, guildData).then(isCommand => {
						if (isCommand == false) {
							userEconomy(database, "add", { guildData: guildData, userData: userData });
						} else return;
					});
				});
			});
		} else {
			getUserData(database, message.author.id).then(userData => {
				checkCommand(client, message, database, userData);
			});
		}
	},
};
