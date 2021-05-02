const { Int32, Long } = require("bson");

module.exports = async function(database, userID) {
	try {
		const userCollection = database.collection("users");

		const newDoc = {
			user: String(userID),
			language: String("EN"),
			prefix: String("//"),
			warns: Int32(0),
			mutes: Int32(0),
			kicks: Int32(0),
			bans: Int32(0)
		};

		const userData = {
			user: userID,
			language: "EN",
			prefix: "//",
			warns: 0,
			mutes: 0,
			kicks: 0,
			bans: 0
		};

		const xpCollection = database.collection("xpCollection");
		const coinsCollection = database.collection("coinsCollection");
		const econDoc = {
			user: String(userID)
		};

		await userCollection.insertOne(newDoc);
		await xpCollection.insertOne(econDoc);
		await coinsCollection.insertOne(econDoc);

		return userData;
	} catch (e) {
		console.error(e);
	}
};
