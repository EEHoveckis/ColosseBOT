const createUserData = require("./createUserData.js");

module.exports = async function(database, userID) {
	try {
		const userCollection = database.collection('users');
		const cursor = await userCollection.findOne({ user: userID });
		if (cursor === null) {
			createUserData(database, userID).then(userData => {
				return userData;
			});
		} else {
			const userData = {
				user: cursor.user,
				language: cursor.language,
				prefix: cursor.prefix,
				money: cursor.money,
				xp: cursor.xp,
				warns: cursor.warns,
				mutes: cursor.mutes,
				kicks: cursor.kicks,
				bans: cursor.bans
			};
			return userData;
		}
	} catch (e) {
		console.error(e);
	}
};
