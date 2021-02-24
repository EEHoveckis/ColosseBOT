const Discord = require("discord.js");
const deleteExpiredWarns = require("./deleteExpiredWarns.js");
const countActiveWarns = require("./countActiveWarns.js");
const { addWarn, addMute, addKick, addBan } = require("./addInfraction.js");
const { warnUser, warnUserF, warnUserNF, muteUser, kickUser, banUser } = require("../../embeds/antiLangEmbeds.js");
const badWords = require("../../files/wordbanks/badWords.js");

module.exports = function(client, database, guildData, message) {
  for(var i = 0; i < badWords.length; i++) {
    var regexCase = new RegExp(`\\b${badWords[i]}\\b`, "gmi");
    var found = regexCase.test(message.content);
    if(found) break;
  }

  deleteExpiredWarns(database, guildData); // Deletes old entries from database.

  if(found) {
    countActiveWarns(database, message.author.id, message.guild.id).then(activeWarns => {
      switch(guildData.antiLangLevel) {
        case 0:   // Do Nothing. AntiLang is disabled in guild.
          break;
        case 1:   // Just warns user.
          addWarn(database, message);
          warnUser(client, message, guildData);
          break;
        case 2:   // Mutes user for X hours after 3 infractions in X hours.
            if(activeWarns < 2) {
              addWarn(database, message);
              warnUserNF(client, guildData, message, activeWarns + 1);
            } else if(activeWarns == 2) {
              addWarn(database, message);
              warnUserF(client, guildData, message);
            } else {
              message.member.roles.add(guildData.muteRole);
              addMute(database, message);
              muteUser(client, message, guildData);
            }
          break;
        case 3:   // Tempbans user for X hours after 3 infractions in X hours.
            if(activeWarns < 2) {
              addWarn(database, message);
              warnUserNF(client, guildData, message, activeWarns + 1);
            } else if(activeWarns == 2) {
              addWarn(database, message);
              warnUserF(client, guildData, message);
            } else {
              addKick(database, message);
              kickUser(client, message, guildData);
              message.member.kick().catch(console.error);
            }
          break;
        case 4:   // Permanently bans user after 3 infractions in X hours.
            if(activeWarns < 2) {
              addWarn(database, message);
              warnUserNF(client, guildData, message, activeWarns + 1);
            } else if(activeWarns == 2) {
              addWarn(database, message);
              warnUserF(client, guildData, message);
            } else {
              addBan(database, message);
              banUser(client, message, guildData);
              message.member.ban().catch(console.error);
            }
          break;
      }
    });
  }
  return found;
};
