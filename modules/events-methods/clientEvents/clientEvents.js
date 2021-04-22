const antiRaid = require("../antiRaid/antiRaid.js");
const antiLang = require("../antiLang/antiLang.js");
const antiSpam = require("../antiSpam/antiSpam.js");
const autoUnmute = require("../otherMethods/autoUnmute.js");
const autoUnkick = require("../otherMethods/autoUnkick.js");
const botStats = require("../dataMethods/botStats.js");
const checkCommand = require("../commandMethods/checkCommand.js");
const deleteExpiredWarns = require("../otherMethods/deleteExpiredWarns.js");
const getGuildData = require("../dataMethods/getGuildData.js");
const getUserData = require("../dataMethods/getUserData.js");
const usersMap = new Map();

module.exports = async function(client, database) {
	setInterval(() => {
		deleteExpiredWarns(client, database);
		autoUnmute(client, database);
		autoUnkick(client, database);
	}, 10000);

	client.once("ready", () => {
		console.log("\nColosseBOT - The Ultimate Discord Bot\nBot Is Ready!\n");
	});

	client.on("guildMemberAdd", (member) => {
		getGuildData(database, member.guild.id).then(guildData => {
			getUserData(database, member.id).then(userData => {
				antiRaid(client, member, database, guildData, userData);
			});
		});
	});

	client.on("guildCreate", (guild) => {
		getGuildData(database, guild.id);
	});

	client.on("message", (message) => {
		if (message.author.bot) return;
		botStats(database, "messages");
		if (message.channel.type == "text") {
			getGuildData(database, message.guild.id).then(guildData => {
				getUserData(database, message.author.id).then(userData => {
					if (message.member.roles.cache.has(guildData.muteRole)) return message.delete();
					if (antiLang(client, database, guildData, userData, message) == true && guildData.punishmentLevel > 0) return;
					if (antiSpam(client, database, guildData, userData, usersMap, message) == true && guildData.punishmentLevel > 0) return;
					checkCommand(client, message, database, guildData);
				});
			});
		} else {
			getUserData(database, message.author.id).then(userData => {
				checkCommand(client, message, database, userData);
			});
		}
	});
};
