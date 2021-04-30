const emojiRegex = require("emoji-regex/RGI_Emoji.js");
const botStats = require("../dataMethods/stats/botStats.js");
const capsAbuse = require("./spamActions/capsAbuse.js");
const inviteLink = require("./spamActions/inviteLink.js");
const massMention = require("./spamActions/massMention.js");
const massEmoji = require("./spamActions/massEmoji.js");
const messageSpam = require("./spamActions/messageSpam.js");
const spoilers = require("./spamActions/spoilers.js");
const zalgoText = require("./spamActions/zalgoText.js");

module.exports = function(client, database, guildData, userData, usersMap, message) {
	if (guildData.antiSpam == false) return false;
	const LIMIT = 5;
	const TIME = 7000;
	const DIFF = 2000;
	const PUNISHTIME = guildData.activeHours * 60 * 60 * 1000;
	let spam1 = spam2 = spam3 = spam4 = spam5 = spam6 = spam7 = false;
	let mentionCount = 0;
	let unicodeEmojiCount = 0;

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

	const splitMessage = message.content.split(/ +/);
	for (i = 0; i < splitMessage.length; i++) {
		const userMention = /^<@![0-9]{18}>$/gmi.test(splitMessage[i]);
		const roleMention = /^<@&[0-9]{18}>$/gmi.test(splitMessage[i]);
		const everyoneMention = /^@everyone$/gmi.test(splitMessage[i]);
		const hereMention = /^@here$/gmi.test(splitMessage[i]);
		if (userMention || roleMention || everyoneMention || hereMention) mentionCount++;
	}
	if (mentionCount > guildData.maxMentions) spam2 = true;

	for (i = 0; i < splitMessage.length; i++) {
		const invite = /discord.gg\/[0-9A-Za-z]+/gmi.test(splitMessage[i]);
		if (invite) {
			spam3 = true;
			break;
		}
	}

	function hasZalgo(text) {
		const re = /%CC%/gmi;
		return re.test(encodeURIComponent(text));
	}
	for (i = 0; i < splitMessage.length; i++) {
		if (hasZalgo(splitMessage[i]) == true) {
			spam4 = true;
			break;
		}
	}

	const regex = emojiRegex();
	let match;
	while (match = regex.exec(message.content)) {
		const emoji = match[0];
		if ([...emoji].length >= 1) {
			unicodeEmojiCount += 1;
		}
	}

	let dividedContent = message.content.replace(/>/gmi, ">\n");
	const regexCase2 = /<:.+:[0-9]{18}>/gmi;
	const customEmojiCount = ((dividedContent || '').match(regexCase2) || []).length;

	const totalEmojiCount = unicodeEmojiCount + customEmojiCount;
	if (totalEmojiCount > guildData.maxEmoji) spam5 = true;

	let numUpper = (message.content.match(/[A-Z]/g) || []).length;
	if (message.content.length >= 20) {
		const percentage = ((numUpper / message.content.length) * 100).toFixed(3);
		if (percentage >= 70) spam6 = true;
	}

	const regexCase3 = /(\|\|)+/gmi;
	const spoilerCount = ((message.content || '').match(regexCase3) || []).length;
	if ((spoilerCount / 2) > 5) spam7 = true;

	if (message.member.roles.cache.some(role => guildData.exemptRoles.includes(role.id)) || message.author.id == message.guild.ownerID) {
		return false;
	} else {
		if (spam1) {
			messageSpam(client, database, guildData, userData, message);
		}
		if (spam2) {
			massMention(client, database, guildData, userData, message);
		}
		if (spam3) {
			inviteLink(client, database, guildData, userData, message);
		}
		if (spam4) {
			zalgoText(client, database, guildData, userData, message);
		}
		if (spam5) {
			massEmoji(client, database, guildData, userData, message);
		}
		if (spam6) {
			capsAbuse(client, database, guildData, userData, message);
		}
		if (spam7) {
			spoilers(client, database, guildData, userData, message);
		}

		if (spam1 || spam2 || spam3 || spam4 || spam5 || spam6 || spam7) botStats(database, "antiSpam");
		return spam1 || spam2 || spam3 || spam4 || spam5 || spam6 || spam7;
	}
};
