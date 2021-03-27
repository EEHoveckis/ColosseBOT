const Discord = require("discord.js");
const loadCommands = require("./modules/events-methods/commandMethods/loadCommands.js");
const connectMongo = require("./modules/events-methods/dataMethods/connectMongo.js");
const clientEvents = require("./modules/events-methods/clientEvents/clientEvents.js");
const { discord_token } = require("./modules/files/config.js");

const client = new Discord.Client();
loadCommands(client);
connectMongo().then(database => {
	clientEvents(client, database);
});

client.login(discord_token);
