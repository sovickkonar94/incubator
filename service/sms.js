
const twilio = require('twilio');
const {SID,SMSSECRET,SENDERNO} = require('../config/constants');


const sendOTP = (phone,otp)=>{
	console.log('calling the sms')
	const client = new twilio(SID,SMSSECRET);
	client.messages.create({
		body:otp,
		to:`+91${phone}`,
		from:SENDERNO
	}).then(message =>{
		console.log('message id is :',message.sid)
	}).catch(err=>console.log('Error: ',err.message))
}

module.exports = sendOTP