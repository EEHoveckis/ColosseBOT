const { Long } = require("bson");

module.exports.addWarn = async function(database, message, reason, infractionID) {
	try {
		const warnCollection = database.collection("activeWarns");
		const doc = { timestamp: Long.fromNumber(Date.now()), id: String(infractionID), user: String(message.author.id), guild: String(message.guild.id), reason: String(reason) };
		await warnCollection.insertOne(doc);

		const infractionsCollection = database.collection("infractions");
		const doc2 = { timestamp: Long.fromNumber(Date.now()), id: String(infractionID), user: String(message.author.id), guild: String(message.guild.id), infraction: String("WARN"), reason: String(reason) };
		await infractionsCollection.insertOne(doc2);
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

module.exports.addMute = async function(database, message, reason, infractionID) {
	try {
		const muteCollection = database.collection("mutedUsers");
		const doc = { timestamp: Long.fromNumber(Date.now()), user: String(message.author.id), guild: String(message.guild.id) };
		await muteCollection.insertOne(doc);

		const infractionsCollection = database.collection("infractions");
		const doc2 = { timestamp: Long.fromNumber(Date.now()), id: String(infractionID), user: String(message.author.id), guild: String(message.guild.id), infraction: String("MUTE"), reason: reason };
		await infractionsCollection.insertOne(doc2);
	} catch (e) {
		console.error(e);
	}
};

module.exports.incrementMutes = async function(database, message) {
	try {
		const userCollection = database.collection("users");
		await userCollection.updateOne({ user: message.author.id }, { $inc: { mutes: 1 } });
	} catch (e) {
		console.error(e);
	}
};

module.exports.addKick = async function(database, message, reason, infractionID) {
	try {
		const muteCollection = database.collection("kickedUsers");
		const doc = { timestamp: Long.fromNumber(Date.now()), user: String(message.author.id), guild: String(message.guild.id) };
		await muteCollection.insertOne(doc);

		const infractionsCollection = database.collection("infractions");
		const doc2 = { timestamp: Long.fromNumber(Date.now()), id: String(infractionID), user: String(message.author.id), guild: String(message.guild.id), infraction: String("TEMPBAN"), reason: reason };
		await infractionsCollection.insertOne(doc2);
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

module.exports.addBan = async function(database, message, reason, infractionID) {
	try {
		const infractionsCollection = database.collection("infractions");
		const doc = { timestamp: Long.fromNumber(Date.now()), id: String(infractionID), user: String(message.author.id), guild: String(message.guild.id), infraction: String("BAN"), reason: reason };
		await infractionsCollection.insertOne(doc);
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
