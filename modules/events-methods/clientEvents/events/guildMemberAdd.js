const antiRaid = require("../../antiRaid/antiRaid.js");
const getGuildData = require("../../dataMethods/getGuildData.js");
const getUserData = require("../../dataMethods/getUserData.js");

module.exports = {
	name: "guildMemberAdd",
	execute(member, client, database) {
		getGuildData(database, member.guild.id).then(guildData => {
			getUserData(database, member.id).then(userData => {
				antiRaid(client, member, database, guildData, userData);
			});
		});
	},
};
