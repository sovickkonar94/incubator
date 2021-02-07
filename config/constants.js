require('dotenv').config();
const PORT = process.env.PORT;
const ROUNDS = process.env.ROUNDS;
const MONGO_URI = process.env.URI;
const SECRET = process.env.SECRET

module.exports = {
	PORT,
	SECRET,
	ROUNDS,
	MONGO_URI
}