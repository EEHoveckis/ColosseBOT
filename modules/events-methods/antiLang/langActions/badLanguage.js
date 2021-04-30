const countActiveWarns = require("../../otherMethods/countActiveWarns.js");
const infractionID = require("../../otherMethods/randomID.js");
const getReason = require("../../otherMethods/getReason.js");
const { incrementWarns, incrementMutes, incrementKicks, incrementBans, addWarn, addMute, addKick, addBan } = require("../../otherMethods/addInfraction.js");
const antiLangEmbeds = require("../../../embeds/antiLangEmbeds.js");

module.exports = function(client, database, guildData, userData, message) {
	infractionID(database).then(infractionID => {
		countActiveWarns(database, message.author.id, message.guild.id).then(activeWarns => {
			switch (guildData.punishmentLevel) {
				case 1:
					addWarn(database, message, "language", infractionID);
					incrementWarns(database, message);
					antiLangEmbeds(client, message, guildData, userData, "warn", { reason: "language", infractionID: infractionID });
					break;
				case 2:
					if (activeWarns < 2) {
						addWarn(database, message, "language", infractionID);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnNF", { activeWarns: activeWarns + 1, reason: "language", infractionID: infractionID });
					} else if (activeWarns == 2) {
						addWarn(database, message, "language", infractionID);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnF", { reason: "language", infractionID: infractionID });
					} else if (activeWarns == 3) {
						if (message.member.roles.cache.has(guildData.muteRole)) {
							message.delete();
						} else {
							message.member.roles.add(guildData.muteRole);
							getReason(client, database, guildData, userData, message, { translate: "GUILD", lastReason: "language" }).then(reason => {
								getReason(client, database, guildData, userData, message, { translate: "USER", lastReason: "language" }).then(reason2 => {
									getReason(client, database, guildData, userData, message, { translate: "NT", lastReason: "language" }).then(muteReason => {
										addMute(database, message, muteReason, infractionID);
										incrementMutes(database, message);
										antiLangEmbeds(client, message, guildData, userData, "mute", { reason: reason, reason2: reason2, infractionID: infractionID });
									});
								});
							});
						}
					}
					break;
				case 3:
					if (activeWarns < 2) {
						addWarn(database, message, "language", infractionID);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnNF", { activeWarns: activeWarns + 1, reason: "language", infractionID: infractionID });
					} else if (activeWarns == 2) {
						addWarn(database, message, "language", infractionID);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnF", { reason: "language", infractionID: infractionID });
					} else if (activeWarns == 3) {
						getReason(client, database, guildData, userData, message, { translate: "GUILD", lastReason: "language" }).then(reason => {
							getReason(client, database, guildData, userData, message, { translate: "USER", lastReason: "language" }).then(reason2 => {
								getReason(client, database, guildData, userData, message, { translate: "NT", lastReason: "language" }).then(kickReason => {
									addKick(database, message, kickReason, infractionID);
									incrementKicks(database, message);
									antiLangEmbeds(client, message, guildData, userData, "kick", { reason: reason, reason2: reason2, infractionID: infractionID });
									message.member.kick().catch(console.error);
								});
							});
						});
					} else {
						message.delete();
					}
					break;
				case 4:
					if (activeWarns < 2) {
						addWarn(database, message, "language", infractionID);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnNF", { activeWarns: activeWarns + 1, reason: "language", infractionID: infractionID });
					} else if (activeWarns == 2) {
						addWarn(database, message, "language", infractionID);
						incrementWarns(database, message);
						antiLangEmbeds(client, message, guildData, userData, "warnF", { reason: "language", infractionID: infractionID });
					} else if (activeWarns == 3) {
						getReason(client, database, guildData, userData, message, { translate: "GUILD", lastReason: "language" }).then(reason => {
							getReason(client, database, guildData, userData, message, { translate: "USER", lastReason: "language" }).then(reason2 => {
								getReason(client, database, guildData, userData, message, { translate: "NT", lastReason: "language" }).then(banReason => {
									addBan(database, message, banReason, infractionID);
									incrementBans(database, message);
									antiLangEmbeds(client, message, guildData, userData, "ban", { reason: reason, reason2: reason2, infractionID: infractionID });
									message.member.ban().catch(console.error);
								});
							});
						});
					} else {
						message.delete();
					}
					break;
			}
		});
	});
};
