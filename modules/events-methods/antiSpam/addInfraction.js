const { Long } = require("bson");

module.exports.addWarn = async function(database, message) {
	try {
		const antiSpamCollection = database.collection("antiSpam");
		const doc = { timestamp: Long.fromNumber(Date.now()), user: String(message.author.id), guild: String(message.guild.id) };
		await antiSpamCollection.insertOne(doc);
	} catch (e) {
		console.error(e);
	}
};

module.exports.incrementWarns = async function(database, message) {
	try {
		const userCollection = database.collection("users");
		await userCollection.updateOne({ user: message.author.id }, { $inc: { warns: 1 } });
	} catch (e) {
		console.error(e);
	}
};

module.exports.incrementMutes = async function(database, message) {
	try {
		const userCollection = database.collection("users");
		await userCollection.updateOne({ user: message.author.id }, { $inc: { mutes: 1 } });

		const muteCollection = database.collection("mutedUsers");
		const doc = { timestamp: Long.fromNumber(Date.now()), user: String(message.author.id), guild: String(message.guild.id) };
		await muteCollection.insertOne(doc);
	} catch (e) {
		console.error(e);
	}
};

module.exports.incrementKicks = async function(database, message) {
	try {
		const userCollection = database.collection("users");
		await userCollection.updateOne({ user: message.author.id }, { $inc: { kicks: 1 } });
	} catch (e) {
		console.error(e);
	}
};

module.exports.incrementBans = async function(database, message) {
	try {
		const userCollection = database.collection("users");
		await userCollection.updateOne({ user: message.author.id }, { $inc: { bans: 1 } });
	} catch (e) {
		console.error(e);
	}
};
