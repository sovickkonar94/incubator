const mongoose = require('mongoose');
const { MONGO_URI } = require('./constants');

const options= {
	useNewUrlParser : true,
	useUnifiedTopology :true,
}

const connect = ()=>{
	mongoose.connect(MONGO_URI,options)
	.then(()=>{
		console.log('database connected')
	})
	.catch(err=>{
		console.log('Error : ',err.message)
	})
}

module.exports = connect

