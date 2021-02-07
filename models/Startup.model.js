const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const StartupSchema = Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true,
	},
	phone:{
		type:Number,
		required:true
	},
	otp:{
		type:Number
	}
},{timestamps:true});

module.exports = mongoose.model('startup',StartupSchema);