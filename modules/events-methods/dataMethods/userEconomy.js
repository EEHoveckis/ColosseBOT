const botStats = require("./botStats.js");

module.exports = async function(database, guildData, userData, choice, otherArgs) {
	if (choice == "add") {
		const coinsAwarded = Math.floor(Math.random() * 20) * guildData.coinRate;
		const xpAwarded = Math.floor(Math.random() * 20) * guildData.xpRate;

		try {
			const usersCollection = database.collection("users");
			await usersCollection.updateOne({ user: userData.user }, { $inc: { coins: coinsAwarded, xp: xpAwarded } });

			botStats(database, "economy", { xp: xpAwarded, coins: coinsAwarded });
		} catch (e) {
			console.error(e);
		}
	}
};
