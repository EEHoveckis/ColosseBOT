module.exports = async function(database, userID, guildID, otherArgs) {
	try {
		const xpCollection = database.collection("xpCollection");
		let obj = {};
		let field = guildID;
		let target = otherArgs.xp;
		obj[field] = target;

		await xpCollection.updateOne({ user: userID }, { $inc: obj });
	} catch (e) {
		console.error(e);
	}
}
