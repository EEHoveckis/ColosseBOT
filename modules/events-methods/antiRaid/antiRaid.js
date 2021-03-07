const antiRaidEmbeds = require("../../embeds/antiRaidEmbeds.js");

module.exports = function(client, guildData) {
  switch (guildData.antiRaidLevel) {
    case 1:
      // Send Captcha and not let post anything while captcha not completed.
      break;
    case 2:
      // Send Captcha and kick user if captcha not complete in 10 minutes?.
      break;
    case 3:
      // Lockdown of channels. Maybe a command not antiRaid?
      break;
  }
};


/*if(guildData.antiLangLevel == 3) {
  countActiveWarns(database, member.id, member.guild.id).then(activeWarns => {
    if(activeWarns == 3) member.kick();
  });
}
if(guildData.antiRaid == true) {
  //antiRaid(client, member, database);
}*/
