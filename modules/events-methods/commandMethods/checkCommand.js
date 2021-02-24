const Discord = require("discord.js");
const errorEmbeds = require("../../embeds/errorEmbeds.js");
const antiLang = require("../antiLang/antiLang.js");
const { prefix, maintenance, ownerID } = require("../../files/config.js");

module.exports = function(client, message, database, data) {
    const cooldowns = new Discord.Collection();

    if(message.content.startsWith(data.prefix)) {
      var prefixLength = data.prefix.length;
    } else if(message.content.startsWith(prefix)) {
      var prefixLength = prefix.length;
    } else return;
    if(message.author.bot) return;
    const args = message.content.slice(prefixLength).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aka && cmd.aka.includes(commandName));
    if(!command) return errorEmbeds.noCommand(client, message, commandName);

    if(maintenance && message.author.id != ownerID) return errorEmbeds.maintenanceActive(client, message);
    if(command.disabled && message.author.id != ownerID) return errorEmbeds.disabledCommand(client, message);
    if(command.ownerOnly && message.author.id != ownerID) return errorEmbeds.ownerOnly(client, message);
    if(command.guildOnly && message.channel.type !== "text") return errorEmbeds.guildOnly(client, message);
    if(command.directOnly && message.channel.type !== "dm") return errorEmbeds.directOnly(client, message);
    if(command.guildOwnerOnly && message.author.id != message.guild.ownerID) return errorEmbeds.guildOwnerOnly(client, message);
    if(command.permsCheck && !message.member.hasPermission(command.neededPerms, { checkAdmin: true, checkOwner: true })) return errorEmbeds.noPerms(client, message, commandName);
    if(command.args) {
        if(!args.length && command.argsCount >= 1) return errorEmbeds.noArgsProvided(client, message, command);
        if(args.length < command.argsCount) return errorEmbeds.notEnoughArgs(client, message, command);
    }

    if(!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown) * 1000;

    if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if(now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return errorEmbeds.cooldownActive(client, message, timeLeft)
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(client, message, args, database, data);
    } catch (error) {
        return errorEmbeds.unknownError(client, message, commandName, error)
    }
}
