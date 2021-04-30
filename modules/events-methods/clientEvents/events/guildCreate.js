const getGuildData = require("../../dataMethods/guilds/getGuildData.js");

module.exports = {
	name: "guildCreate",
	execute(guild, client, database) {
		getGuildData(database, guild.id);
	},
};
