const botStats = require("./botStats.js");

module.exports = async function(database, choice, otherArgs) {
	try {
		const usersCollection = database.collection("users");
		switch (choice) {
			case "add":
				const coinsAwarded = Math.floor(Math.random() * 20) * otherArgs.guildData.coinRate;
				const xpAwarded = Math.floor(Math.random() * 20) * otherArgs.guildData.xpRate;

				await usersCollection.updateOne({ user: otherArgs.userData.user }, { $inc: { coins: coinsAwarded, xp: xpAwarded } });

				botStats(database, "economy", { xp: xpAwarded, coins: coinsAwarded });
				break;
			case "get":
				const userData = await usersCollection.findOne({ user: otherArgs.id });
				return userData;
				break;
		}
	} catch (e) {
		console.error(e);
	}
};
