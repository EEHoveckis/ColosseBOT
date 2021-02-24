const createGuildData = require("./createGuildData.js");

module.exports = async function(database, guildID) {
  try {
    const guildCollection = database.collection('guilds');

    const cursor = await guildCollection.findOne({ guild: guildID });
    if(cursor === null) {
      createGuildData(database, guildID);
    } else {
      const guildData = {
        language: cursor.language,
        prefix: cursor.prefix,
        antiLangLevel: cursor.antiLangLevel,
        antiSpamLevel: cursor.antiSpamLevel,
        antiRaidLevel: cursor.antiRaidLevel,
        activeHours: cursor.activeHours,
        defaultRole: cursor.defaultRole,
        muteRole: cursor.muteRole,
        moderationLogs: cursor.moderationLogs,
        moderationLogsChannel: cursor.moderationLogsChannel,
        botCommands: cursor.botCommands,
        botCommandsChannel: cursor.botCommandsChannel,
        welcomeLogs: cursor.welcomeLogs,
        welcomeLogsChannel: cursor.welcomeLogsChannel,
        welcomeType: cursor.welcomeType,
        stats: cursor.stats
      };
      return guildData;
    }
  } catch(e) {
    console.error(e);
  }
};
