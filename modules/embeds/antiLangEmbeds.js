const Discord = require("discord.js");
const { colorYellow, colorOrange, colorRed, colorBlack, botWebsite } = require("../files/config.js");

module.exports = function(client, message, guildData, choice, activeWarns) {
  const { antiLangStrings } = require(`../files/wordbanks/wordbanks${guildData.language}.js`);
  message.delete();

  switch (choice) {
    case "warn":
      var tString = antiLangStrings.warn.replace("%author%", `**${message.author.tag}**`);

      const warnUserEmbed = new Discord.MessageEmbed()
      .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
      .setColor(colorYellow)
      .setDescription(tString);

      message.channel.send(warnUserEmbed);
      break;
    case "warnNF":
      var tString = antiLangStrings.warn.replace("%author%", `**${message.author.tag}**`);
      var tString2 = antiLangStrings.warnX.replace("%active%", activeWarns);
      tString2 = tString2.replace("%hours%", guildData.activeHours);

      const warnUserNFEmbed = new Discord.MessageEmbed()
      .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
      .setColor(colorYellow)
      .setDescription(tString)
      .setFooter(tString2);

      message.channel.send(warnUserNFEmbed);
      break;
    case "warnF":
      var tString = antiLangStrings.warn.replace("%author%", `**${message.author.tag}**`);

      if(guildData.antiLangLevel == 2) {
        var i = 0;
      } else if(guildData.antiLangLevel == 3) {
        var i = 1;
      } else {
        var i = 2;
      }

      const warnUserFEmbed = new Discord.MessageEmbed()
      .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
      .setColor(colorYellow)
      .setDescription(tString)
      .setFooter(antiLangStrings.warnFinal[i]);

      message.channel.send(warnUserFEmbed);
      break;
    case "mute":
      var tString = antiLangStrings.mute.replace("%author%", `**${message.author.tag}**`);

      const muteUserEmbed = new Discord.MessageEmbed()
      .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
      .setColor(colorOrange)
      .setDescription(tString);

      message.channel.send(muteUserEmbed);
      break;
    case "kick":
      var tString = antiLangStrings.kick.replace("%author%", `**${message.author.tag}**`);

      const kickUserEmbed = new Discord.MessageEmbed()
      .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
      .setColor(colorRed)
      .setDescription(tString);

      message.channel.send(kickUserEmbed);
      break;
    case "ban":
      var tString = antiLangStrings.ban.replace("%author%", `**${message.author.tag}**`);

      const banUserEmbed = new Discord.MessageEmbed()
      .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
      .setColor(colorBlack)
      .setDescription(tString);

      message.channel.send(banUserEmbed);
  }
}
