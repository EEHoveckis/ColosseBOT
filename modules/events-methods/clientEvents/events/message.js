const antiLang = require("../../antiLang/antiLang.js");
const antiSpam = require("../../antiSpam/antiSpam.js");
const botStats = require("../../dataMethods/stats/botStats.js");
const checkCommand = require("../../commandMethods/checkCommand.js");
const getGuildData = require("../../dataMethods/guilds/getGuildData.js");
const getUserData = require("../../dataMethods/users/getUserData.js");
const userEconomy = require("../../dataMethods/economy/userEconomy.js");

module.exports = {
	name: "message",
	execute(message, client, database, usersMap) {
		if (message.author.bot) return;
		botStats(database, "messages");
		if (message.channel.type == "text") {
			getGuildData(database, message.guild.id).then(guildData => {
				getUserData(database, message.author.id).then(userData => {
					if (message.member.roles.cache.has(guildData.muteRole)) return message.delete();
					const langResult = antiLang(client, database, guildData, userData, message);
					const spamResult = antiSpam(client, database, guildData, userData, usersMap, message);
					if ((langResult || spamResult) == true && guildData.punishmentLevel > 0) {
						message.delete();
						return;
					}
					checkCommand(client, message, database, guildData).then(isCommand => {
						if (isCommand == false) {
							userEconomy(database, "add", { guildData: guildData, userData: userData, message: message });
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
