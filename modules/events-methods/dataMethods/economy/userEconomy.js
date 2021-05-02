const { Long } = require("bson");
const awardXP = require("./awardXP.js");
const awardCoins = require("./awardCoins.js");
const botStats = require("../stats/botStats.js");

module.exports = function(database, choice, otherArgs) {
	try {
		switch (choice) {
			case "add":
				const xpValue = Math.floor(Math.random() * 20) * otherArgs.guildData.xpRate;;
				const coinValue = Math.floor(Math.random() * 20) * otherArgs.guildData.coinRate;;
				botStats(database, "economy", { xp: xpValue, coins: coinValue });

				awardXP(database, otherArgs.message.author.id, otherArgs.message.guild.id, { xp: xpValue });
				awardCoins(database, otherArgs.message.author.id, otherArgs.message.guild.id, { coins: coinValue });
				break;
			case "get":
				//will rework later
				break;
		}
	} catch (e) {
		console.error(e);
	}
};
