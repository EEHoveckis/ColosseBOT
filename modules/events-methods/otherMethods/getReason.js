module.exports = async function(client, database, guildData, userData, message, options) {
	const userInfStrings = require(`../../files/wordbanks/wordbanks${userData.language}`).infractionStrings;
	const guildInfStrings = require(`../../files/wordbanks/wordbanks${guildData.language}`).infractionStrings;
	try {
		const warnCollection = database.collection("activeWarns");
		const activeTime = guildData.activeHours * 1000 * 60 * 60;
		const expiredTime = Date.now() - activeTime;
		const cursor = await warnCollection.find({ user: message.author.id, guild: message.guild.id, timestamp: { $gt: expiredTime } });
		const cursorArray = await cursor.toArray();
		let reason = [];

		function uniqueArray(arrArg) {
			return arrArg.filter(function(elem, pos, arr) {
				return arr.indexOf(elem) == pos;
			});
		};

		if (options.translate == "NT") {
			for (i = 0; i < cursorArray.length; i++) {
				reason.push(cursorArray[i].reason);
			}
		} else if (options.translate == "USER") {
			for (i = 0; i < cursorArray.length; i++) {
				reason[0] = userInfStrings[options.lastReason];
				translatedReason = userInfStrings[cursorArray[i].reason];
				reason.push(translatedReason);
			}
		} else {
			for (i = 0; i < cursorArray.length; i++) {
				reason[0] = guildInfStrings[options.lastReason];
				translatedReason = guildInfStrings[cursorArray[i].reason];
				reason.push(translatedReason);
			}
		}
		reason = uniqueArray(reason);
		if (reason.length == 1) {
			reason = reason[0];
			return reason;
		} else return reason;
	} catch (e) {
		console.error(e);
	}
};
