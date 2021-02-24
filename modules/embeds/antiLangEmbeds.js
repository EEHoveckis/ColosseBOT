const Discord = require("discord.js");
const { colorYellow, colorOrange, colorRed, colorBlack, botWebsite } = require("../files/config.js");

module.exports.warnUser = function(client, message, guildData) {
  const { antiLangStrings } = require(`../files/wordbanks/wordbanks${guildData.language}.js`);
  const warnUserEmbed = new Discord.MessageEmbed()
  .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
  .setColor(colorYellow)
  .setDescription(`**${message.author.tag}** ${antiLangStrings.warn}`);

  message.channel.send(warnUserEmbed);
  message.delete();
};

module.exports.warnUserNF = function(client, guildData, message, activeWarns) {
  const { antiLangStrings } = require(`../files/wordbanks/wordbanks${guildData.language}.js`);
  const warnUserNFEmbed = new Discord.MessageEmbed()
  .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
  .setColor(colorYellow)
  .setDescription(`**${message.author.tag}** ${antiLangStrings.warn}`)
  .setFooter(`${antiLangStrings.warnX_1} ${activeWarns} ${antiLangStrings.warnX_2} ${guildData.activeHours} ${antiLangStrings.warnX_3}`);

  message.channel.send(warnUserNFEmbed);
  message.delete();
};

module.exports.warnUserF = function(client, guildData, message) {
  const { antiLangStrings } = require(`../files/wordbanks/wordbanks${guildData.language}.js`);
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
  .setDescription(`**${message.author.tag}** ${antiLangStrings.warn}`)
  .setFooter(antiLangStrings.warnFinal[i]);

  message.channel.send(warnUserFEmbed);
  message.delete();
};

module.exports.muteUser = function(client, message, guildData) {
  const { antiLangStrings } = require(`../files/wordbanks/wordbanks${guildData.language}.js`);
  const muteUserEmbed = new Discord.MessageEmbed()
  .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
  .setColor(colorOrange)
  .setDescription(`**${message.author.tag}** ${antiLangStrings.mute}`);

  message.channel.send(muteUserEmbed);
  message.delete();
};

module.exports.kickUser = function(client, message, guildData) {
  const { antiLangStrings } = require(`../files/wordbanks/wordbanks${guildData.language}.js`);
  const kickUserEmbed = new Discord.MessageEmbed()
  .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
  .setColor(colorRed)
  .setDescription(`**${message.author.tag}** ${antiLangStrings.kick}`);

  message.channel.send(kickUserEmbed);
  message.delete();
};

module.exports.banUser = function(client, message, guildData) {
  const { antiLangStrings } = require(`../files/wordbanks/wordbanks${guildData.language}.js`);
  const banUserEmbed = new Discord.MessageEmbed()
  .setAuthor(`⋙ ${client.user.username} || AntiLang ⋘`, "", botWebsite)
  .setColor(colorBlack)
  .setDescription(`**${message.author.tag}** ${antiLangStrings.ban}`);

  message.channel.send(banUserEmbed);
  message.delete();
};
