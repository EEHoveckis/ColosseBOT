const antiRaid = require("../antiRaid/antiRaid.js");
const antiLang = require("../antiLang/antiLang.js");
const antiSpam = require("../antiSpam/antiSpam.js");
const autoUnmute = require("../otherMethods/autoUnmute.js");
const deleteExpiredWarns = require("../otherMethods/deleteExpiredWarns.js");
const welcomeEmbeds = require("../../embeds/welcomeEmbeds.js");
const checkCommand = require("../commandMethods/checkCommand.js");
const getGuildData = require("../dataMethods/getGuildData.js");
const getUserData = require("../dataMethods/getUserData.js");
const usersMap = new Map();

module.exports = async function(client, database) {
	setInterval(() => {
		deleteExpiredWarns(client, database);
		autoUnmute(client, database);
	}, 10000);

	client.once("ready", () => {
		console.log(`\nColosseBOT - The Ultimate Discord Bot\nBot Is Ready!\n`);
	});

	client.on("guildMemberAdd", (member) => {
		getGuildData(database, member.guild.id).then(guildData => {
			getUserData(database, member.id).then(userData => {
				antiRaid(client, member, database, guildData, userData);
			});
			/*if(guildData.welcomeLogs == true) {
			  welcomeEmbeds(client, member, guildData);
			}*/
		});
	});

	client.on("guildCreate", (guild) => {
		getGuildData(database, guild.id);
		// To be filled later
	});

	client.on("message", (message) => {
		if (message.author.bot) return;
		if (message.channel.type == "text") {
			getGuildData(database, message.guild.id).then(guildData => {
				getUserData(database, message.author.id).then(userData => {
					if (antiLang(client, database, guildData, userData, message) == true && guildData.antiLangLevel > 0) return;
					if (antiSpam(client, database, guildData, userData, usersMap, message) == true && guildData.antiSpamLevel > 0) return;
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
