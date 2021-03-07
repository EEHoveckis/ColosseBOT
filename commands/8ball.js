const Discord = require("discord.js");
const commandEmbeds = require("../modules/embeds/commandEmbeds.js");

module.exports = {
	name: "8ball",
	description: "Returns a random 8ball response to question.",
	usage: "//8ball <Question>",
	args: true,
	argsCount: 1,
	execute(client, message, args, database, data) {
		const { ballreplies } = require(`../modules/files/wordbanks/wordbanks${data.language}.js`);

		const question = args.join(" ");
		const index = Math.floor(Math.random() * (ballreplies.length));
		const reply = ballreplies[index];
		return commandEmbeds(client, message, data, "8ball", {question: question, reply: reply});
	},
};
