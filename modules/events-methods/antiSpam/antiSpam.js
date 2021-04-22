const botStats = require("../dataMethods/botStats.js");
const messageSpam = require("./messageSpam.js");
const massMention = require("./massMention.js");
const inviteLink = require("./inviteLink.js");

module.exports = function(client, database, guildData, userData, usersMap, message) {
	const LIMIT = 5;
	const TIME = 7000;
	const DIFF = 2000;
	const PUNISHTIME = guildData.activeHours * 60 * 60 * 1000;
	let spam1 = spam2 = spam3 = false;

	if (usersMap.has(message.author.id)) {
		const authorData = usersMap.get(message.author.id);
		const { lastMessage, timer } = authorData;
		const difference = message.createdTimestamp - lastMessage.createdTimestamp;
		let msgCount = authorData.msgCount;
		if (difference > DIFF) {
			clearTimeout(timer);
			authorData.msgCount = 1;
			authorData.lastMessage = message;
			authorData.timer = setTimeout(() => {
				usersMap.delete(message.author.id);
			}, TIME);
			usersMap.set(message.author.id, authorData);
		} else {
			++msgCount;
			if (parseInt(msgCount) === LIMIT) {
				spam1 = true;
			} else {
				authorData.msgCount = msgCount;
				usersMap.set(message.author.id, authorData);
			}
		}
	} else {
		let fn = setTimeout(() => {
			usersMap.delete(message.author.id);
		}, TIME);
		usersMap.set(message.author.id, {
			msgCount: 1,
			lastMessage: message,
			timer: fn
		});
	}

	let mentionCount = 0;
	const splitMessage = message.content.split(/ +/);
	for (var i = 0; i < splitMessage.length; i++) {
		const userMention = /^<@![0-9]{18}>$/gmi.test(splitMessage[i]);
		const everyoneMention = /^@everyone$/gmi.test(splitMessage[i]);
		const hereMention = /^@here$/gmi.test(splitMessage[i]);
		if (userMention || everyoneMention || hereMention) mentionCount++;
	}
	if (mentionCount > guildData.maxMentions) spam2 = true;

	for (var i = 0; i < splitMessage.length; i++) {
		const invite = /discord.gg\/[0-9A-Za-z]+/gmi.test(splitMessage[i]);
		if (invite) {
			spam3 = true;
			break;
		}
	}

	if (message.member.roles.cache.some(role => guildData.exemptRoles.includes(role.id))) {
		return false;
	} else if (message.author.id == message.guild.ownerID) {
		return false;
	} else {
		if (spam1) {
			messageSpam(client, database, guildData, userData, message);
		} else if (spam2) {
			massMention(client, database, guildData, userData, message);
		} else if (spam3) {
			inviteLink(client, database, guildData, userData, message);
		}

		if (spam1 || spam2 || spam3) botStats(database, "antiSpam");
		return spam1 || spam2 || spam3;
	}
};
