require('dotenv').config();
const PORT = process.env.PORT;
const ROUNDS = process.env.ROUNDS;
const MONGO_URI = process.env.URI;
const SECRET = process.env.SECRET
const SID = process.env.SID;
const SMSSECRET = process.env.SMSSECRET
const SENDERNO = process.env.NUMBER_SEND
module.exports = {
	PORT,
	SECRET,
	ROUNDS,
	MONGO_URI,
	SID,
	SMSSECRET,
	SENDERNO
}