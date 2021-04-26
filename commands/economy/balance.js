const commandEmbeds = require("../../modules/embeds/commandEmbeds.js");
const userEconomy = require("../../modules/events-methods/dataMethods/userEconomy.js");

module.exports = {
	name: "balance",
	description: "Returns a user balance.",
	usage: "//balance",
	execute(client, message, args, database, data) {
		userEconomy(database, "get", { id: message.author.id }).then(userData => {
			return commandEmbeds(client, message, data, "balance", { userData: userData });
		});
	},
};
