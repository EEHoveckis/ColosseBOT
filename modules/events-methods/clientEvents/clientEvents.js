const antiLang = require("../antiLang/antiLang.js");
const welcomeEmbeds = require("../../embeds/welcomeEmbeds");
const checkCommand = require("../commandMethods/checkCommand.js");
const getGuildData = require("../dataMethods/getGuildData.js");
const getUserData = require("../dataMethods/getUserData.js");
const countActiveWarns = require("../antiLang/countActiveWarns.js");

module.exports = function(client, database) {
  client.once("ready", () => {
    console.log(`\nColosseBOT - The Ultimate Discord Bot\nBot Is Ready!\n`);
  });

  client.on("guildMemberAdd", (member) => {
    getGuildData(database, member.guild.id).then(guildData => {
      if(guildData.antiLangLevel == 3) {
        countActiveWarns(database, member.id, member.guild.id).then(activeWarns => {
          if(activeWarns == 3) member.kick();
        });
      }
      if(guildData.antiRaid == true) {
        //antiRaid(client, member, database);
      }
      if(guildData.welcomeLogs == true) {
        welcomeEmbeds(client, member, guildData);
      }
    });
    console.log(`${member.user.tag} has joined the guild ${member.guild.name}!`);
  });

  client.on("guildCreate", (guild) => {
    getGuildData(database, guild.id);
  });

  client.on("message", (message) => {
    if(message.channel.type == "text") {
      getGuildData(database, message.guild.id).then(guildData => {
        getUserData(database, message);
        if(antiLang(client, database, guildData, message) == true && guildData.antiLangLevel > 0) return;
        checkCommand(client, message, database, guildData);
      });
    } else {
      getUserData(database, message).then(userData => {
        console.log(userData);
        checkCommand(client, message, database, userData);
      });
    }
  });
};
