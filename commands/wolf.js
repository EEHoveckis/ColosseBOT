const Discord = require("discord.js");
const { colorWhite } = require("../config.json");
const fetch = require("node-fetch");
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;


module.exports = {
	name: 'wolf',
	description: 'Sends a random wolf image.',
	usage: '//wolf',
	args: false,
	argsCount: 0,
	guildOnly: false,
	directOnly: false,
	roleCheck: false,
	cooldown: 3,
	disabled: false,
	execute(client, message, args) {

		const unsplash = new Unsplash({
			accessKey: process.env.UNSPLASH_ACCESS,
			secret: process.env.UNSPLASH_SECRET
	 	});
			try {
				unsplash.photos.getRandomPhoto({ query: "wolf" })
					.then(result => result.json()).then(body => {
							if(!body) return message.channel.send("Sorry, I couldn't get the image. Try again later.");

							const wolfEmbed = new Discord.MessageEmbed()
							.setDescription(`Photo by [${body.user.name}](${body.user.links.html}) on [Unsplash](https://unsplash.com/?utm_source=ColosseBOT&utm_medium=referral)`)
							.setColor(colorWhite)
							.setImage(body.urls.raw)

							unsplash.photos.downloadPhoto(body);

							return message.channel.send({embed: wolfEmbed});
					});
			} catch(error) {
				console.log(error.stack);
				return message.channel.send("Sorry, I couldn't get the image. Try again later.");
			}
  },
};
