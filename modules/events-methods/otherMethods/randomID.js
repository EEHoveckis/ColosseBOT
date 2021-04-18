module.exports = async function(database) {
	try {
		let found = true;
		let result;
		while (found) {
			let id = [];
			const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
			const charactersLength = characters.length;
			for (var i = 0; i < 8; i++) {
				id.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
			}

			result = id.join('');
			const infractionsCollection = database.collection("infractions");
			const cursor = await infractionsCollection.findOne({ id: result });
			if (!cursor) {
				found = false;
			}
		}
		return result;
	} catch (e) {
		console.error(e);
	}
};
