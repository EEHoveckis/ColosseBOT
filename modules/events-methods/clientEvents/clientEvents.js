const fs = require("fs");
const autoUnmute = require("../otherMethods/autoUnmute.js");
const autoUnkick = require("../otherMethods/autoUnkick.js");
const deleteExpiredWarns = require("../otherMethods/deleteExpiredWarns.js");
const usersMap = new Map();

module.exports = async function(client, database) {
	setInterval(() => {
		deleteExpiredWarns(client, database);
		autoUnmute(client, database);
		autoUnkick(client, database);
	}, 10000);

	const eventFiles = fs.readdirSync("./modules/events-methods/clientEvents/events").filter(file => file.endsWith(".js"));

	for (const file of eventFiles) {
		const event = require(`./events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client, database, usersMap));
		}
	}
};
