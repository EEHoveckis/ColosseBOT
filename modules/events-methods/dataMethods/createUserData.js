const { Int32, Decimal128 } = require("bson");

module.exports = async function(database, userID) {
	try {
		const userCollection = database.collection("users");

		const newDoc = {
			user: String(userID),
			language: String("EN"),
			prefix: String("//"),
			money: Decimal128.fromString("0"),
			xp: Decimal128.fromString("0"),
			warns: Int32(0),
			mutes: Int32(0),
			kicks: Int32(0),
			bans: Int32(0)
		};

		const userData = {
			user: userID,
			language: "EN",
			prefix: "//",
			money: 0,
			xp: 0,
			warns: 0,
			mutes: 0,
			kicks: 0,
			bans: 0
		};

		await userCollection.insertOne(newDoc);
		return userData;
	} catch (e) {
		console.error(e);
	}
};
