const badLanguage = require("./badLanguage.js");
const badName = require("./badName.js");
const botStats = require("../dataMethods/botStats.js");
const badWords = require("../../files/wordbanks/badWords.js");

module.exports = function(client, database, guildData, userData, message) {
	if (guildData.antiLang == false) return false;
	let found = found2 = false;
	for (i = 0; i < badWords.length; i++) {
		const regexCase = new RegExp(`\\b${badWords[i]}\\b`, "gmi");
		found = regexCase.test(message.content);
		if (found) break;
	}
	if (!found) {
		for (i = 0; i < badWords.length; i++) {
			const regexCase = new RegExp(`\\b${badWords[i]}\\b`, "gmi");
			found2 = regexCase.test(message.member.nickname);
			if (found2) break;
		}
	}

	if (message.member.roles.cache.some(role => guildData.exemptRoles.includes(role.id)) || message.author.id == message.guild.ownerID) {
		return false;
	} else {
		if (found) {
			badLanguage(client, database, guildData, userData, message);
			botStats(database, "antiLang");
		}
		if (found2) {
			badName(client, database, guildData, userData, message);
			botStats(database, "antiLang");
		}
		return found || found2;
	}
};
