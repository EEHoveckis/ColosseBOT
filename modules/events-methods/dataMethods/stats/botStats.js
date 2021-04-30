module.exports = async function(database, choice, otherArgs) {
	try {
		const statsCollection = database.collection("botStats");
		let target, target2, field, field2;
		let obj = {};
		if (choice == "commands") {
			field = otherArgs.commandName;
			target = 1;
			obj[field] = target;
		} else if (choice == "error") {
			field = otherArgs.commandName;
			target = 1;
			obj[field] = target;
		} else if (choice == "economy") {
			field = "totalCoins";
			field2 = "totalXP";
			target = otherArgs.coins;
			target2 = otherArgs.xp;
			obj[field] = target;
			obj[field2] = target2;
		}
		switch (choice) {
			case "commands":
				await statsCollection.updateOne({ stats: "commands" }, { $inc: obj });
				break;
			case "error":
				await statsCollection.updateOne({ stats: "error" }, { $inc: obj });
				break;
			case "messages":
				await statsCollection.updateOne({ stats: "messages" }, { $inc: { messagesSent: 1 } });
				break;
			case "antiLang":
				await statsCollection.updateOne({ stats: "antiLang" }, { $inc: { found: 1 } });
				break;
			case "antiSpam":
				await statsCollection.updateOne({ stats: "antiSpam" }, { $inc: { found: 1 } });
				break;
			case "economy":
				await statsCollection.updateOne({ stats: "economy" }, { $inc: obj });
				break;
		}
	} catch (e) {
		console.error(e);
	}
};
