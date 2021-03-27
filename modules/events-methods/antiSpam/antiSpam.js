const countActiveWarns = require("./countActiveWarns.js");
const { addWarn, incrementWarns, incrementMutes, incrementKicks, incrementBans } = require("./addInfraction.js");
const antiSpamEmbeds = require("../../embeds/antiSpamEmbeds.js");

module.exports = function(client, database, guildData, userData, usersMap, message) {
	const LIMIT = 5;
	const TIME = 7000;
	const DIFF = 2000;
	const PUNISHTIME = guildData.activeHours * 60 * 60 * 1000;
	let spam = false;

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
				spam = true;
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

	if (spam) {
		countActiveWarns(database, message.author.id, message.guild.id).then(activeWarns => {
			switch (guildData.antiSpamLevel) {
				case 0: // Do Nothing. AntiLang is disabled in guild.
					break;
				case 1: // Just warns user.
					incrementWarns(database, message);
					antiSpamEmbeds(client, message, guildData, userData, "warn");
					break;
				case 2: // Mutes user for X hours after 3 infractions in X hours.
					if (activeWarns < 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "warnNF", activeWarns + 1);
					} else if (activeWarns == 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "warnF");
					} else {
						message.member.roles.add(guildData.muteRole);
						incrementMutes(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "mute")
					}
					break;
				case 3: // Tempbans user for X hours after 3 infractions in X hours.
					if (activeWarns < 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "warnNF", activeWarns + 1);
					} else if (activeWarns == 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "warnF");
					} else {
						incrementKicks(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "kick")
						message.member.kick().catch(console.error);
					}
					break;
				case 4: // Permanently bans user after 3 infractions in X hours.
					if (activeWarns < 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "warnNF", activeWarns + 1);
					} else if (activeWarns == 2) {
						addWarn(database, message);
						incrementWarns(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "warnF");
					} else {
						incrementBans(database, message);
						antiSpamEmbeds(client, message, guildData, userData, "ban")
						message.member.ban().catch(console.error);
					}
					break;
			}
		});
	}
	return spam;
};
