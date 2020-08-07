const Discord = require("discord.js");
const { colorWhite } = require("../config.json");
const fetch = require("node-fetch");
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;


module.exports = {
	name: 'koala',
	description: 'Sends a random koala image.',
	usage: '//koala',
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
				unsplash.photos.getRandomPhoto({ query: "koala" })
					.then(result => result.json()).then(body => {
							if(!body) return message.channel.send("Sorry, I couldn't get the image. Try again later.");

							const koalaEmbed = new Discord.MessageEmbed()
							.setDescription(`Photo by [${body.user.name}](${body.user.links.html}) on [Unsplash](https://unsplash.com/?utm_source=ColosseBOT&utm_medium=referral)`)
							.setColor(colorWhite)
							.setImage(body.urls.raw)

							unsplash.photos.downloadPhoto(body);

							return message.channel.send({embed: koalaEmbed});
					}).catch(error => {
				console.log(error.stack);
				return message.channel.send("Sorry, I couldn't get the image. Try again later.");
			});
  },
};
