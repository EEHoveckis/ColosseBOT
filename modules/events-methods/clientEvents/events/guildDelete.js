const deleteGuildData = require("../../dataMethods/deleteGuildData.js");

module.exports = {
	name: "guildDelete",
	execute(guild, client, database) {
		deleteGuildData(database, guild.id);
	},
};
