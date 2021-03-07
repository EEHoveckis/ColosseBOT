const antiLang = require("../antiLang/antiLang.js");
const antiRaid = require("../antiRaid/antiRaid.js");
const welcomeEmbeds = require("../../embeds/welcomeEmbeds.js");
const checkCommand = require("../commandMethods/checkCommand.js");
const getGuildData = require("../dataMethods/getGuildData.js");
const getUserData = require("../dataMethods/getUserData.js");

module.exports = function(client, database) {
  client.once("ready", () => {
    console.log(`\nColosseBOT - The Ultimate Discord Bot\nBot Is Ready!\n`);
  });

  client.on("guildMemberAdd", (member) => {
    getGuildData(database, member.guild.id).then(guildData => {
      antiRaid(guildData, member);
      /*if(guildData.welcomeLogs == true) {
        welcomeEmbeds(client, member, guildData);
      }*/
    });
  });

  client.on("guildCreate", (guild) => {
    getGuildData(database, guild.id);
    // To be filled later
  });

  client.on("message", (message) => {
    if(message.author.bot) return;
    if(message.channel.type == "text") {
      getGuildData(database, message.guild.id).then(guildData => {
        getUserData(database, message);
        if(antiLang(client, database, guildData, message) == true && guildData.antiLangLevel > 0) return;
        checkCommand(client, message, database, guildData);
      });
    } else {
      getUserData(database, message).then(userData => {
        checkCommand(client, message, database, userData);
      });
    }
  });
};
