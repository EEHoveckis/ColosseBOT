module.exports = async function(database, userID, guildID, otherArgs) {
	try {
		const coinsCollection = database.collection("coinsCollection");
		let obj = {};
		let field = guildID;
		let target = otherArgs.coins;
		obj[field] = target;

		await coinsCollection.updateOne({ user: userID }, { $inc: obj });
	} catch (e) {
		console.error(e);
	}
}
