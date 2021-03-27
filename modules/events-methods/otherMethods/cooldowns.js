const { Long } = require("bson");
const errorEmbeds = require("../../embeds/errorEmbeds.js");

module.exports = async function(client, message, command, database, data) {
	try {
		const cooldownsCollection = database.collection('cooldowns');
		expirationTime = Date.now() + command.cooldown * 1000;
		const doc = { expirationTime: Long.fromNumber(expirationTime), command: String(command.name), user: String(message.author.id) };
		const cursor = await cooldownsCollection.findOne({ user: message.author.id, command: command.name });
		if (cursor === null) { // No cooldown found, add new and execute command.
			await cooldownsCollection.insertOne(doc);
			return false;
		} else { // Cooldown found, check if cooldown active.
			const now = Date.now();
			if (cursor.expirationTime < now) { // Cooldown expired, renew and execute command.
				await cooldownsCollection.deleteOne({ command: command.name, user: message.author.id });
				await cooldownsCollection.insertOne(doc);
				return false;
			} else { // Cooldown active, send embed and stop execution.
				const timeLeft = (cursor.expirationTime - now) / 1000;
				errorEmbeds(client, message, data, "cooldownActive", { timeLeft: timeLeft });
				return true;
			}
		}
	} catch (e) {
		console.error(e);
	}
};
