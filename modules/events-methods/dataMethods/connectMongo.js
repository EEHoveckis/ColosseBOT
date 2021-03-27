const { MongoClient } = require("mongodb");
const { mongoURI } = require("../../files/config.js");

module.exports = async function() {
	const mongoClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

	await mongoClient.connect();
	return database = mongoClient.db('ColosseBOT');
};
