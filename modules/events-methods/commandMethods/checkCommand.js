const Discord = require("discord.js");
const cooldowns = require("./cooldowns.js");
const errorEmbeds = require("../../embeds/errorEmbeds.js");
const { prefix, maintenance, ownerID } = require("../../files/config.js");

module.exports = async function(client, message, database, data) {
    if(message.content.startsWith(data.prefix)) {
      var prefixLength = data.prefix.length;
    } else if(message.content.startsWith(prefix)) {
      var prefixLength = prefix.length;
    } else return;
    const args = message.content.slice(prefixLength).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aka && cmd.aka.includes(commandName));
    if(!command) return errorEmbeds(client, message, data, "noCommand", {commandName: commandName});

    if(maintenance && message.author.id != ownerID) return errorEmbeds(client, message, data, "maintenanceActive");
    if(command.disabled && message.author.id != ownerID) return errorEmbeds(client, message, data, "disabledCommand");
    if(command.ownerOnly && message.author.id != ownerID) return errorEmbeds(client, message, data, "ownerOnly");
    if(command.guildOnly && message.channel.type !== "text") return errorEmbeds(client, message, data, "guildOnly");
    if(command.directOnly && message.channel.type !== "dm") return errorEmbeds(client, message, data, "directOnly");
    if(command.guildOwnerOnly && message.author.id != message.guild.ownerID) return errorEmbeds(client, message, data, "guildOwnerOnly");
    if(command.permsCheck && !message.member.hasPermission(command.neededPerms, { checkAdmin: true, checkOwner: true })) return errorEmbeds(client, message, data, "noPerms");
    if(command.args) {
        if(!args.length && command.argsCount >= 1) return errorEmbeds(client, message, data, "noArgsProvided", {usage: command.usage});
        if(args.length < command.argsCount) return errorEmbeds(client, message, data, "notEnoughArgs", {usage: command.usage});
    }
    if(command.cooldown) {
      const cooldownActive = await cooldowns(client, message, command, database, data);
      if(cooldownActive == true) return;
    }

    try {
      command.execute(client, message, args, database, data);
    } catch (error) {
        errorEmbeds(client, message, data, "unknownError", {commandName: commandName, error: error});
    }
};
