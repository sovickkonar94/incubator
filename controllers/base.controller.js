const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendOTP = require('../service/sms');

const { ROUNDS ,SECRET } = require('../config/constants');
const Investor = require('../models/Investor.model');
const Startup = require('../models/Startup.model');


const test = (req,res)=>{
	return res.json({
		message:'server is up and running'
	})
}

const register = async (req,res)=>{
	try{

		let name = req.body.name;
		let email = req.body.email;
		let password = req.body.password;
		let phone = req.body.phone;
		let userType = req.body.type;

		if(userType === 'i'){
			//check if the Investor exists
			let result = await Investor.findOne({phone:phone})
			console.log('result = ',result)
			if(result){
				return res.status(409).json({
					error:true,
					message:'Investor Exists'
				})
			}
			else{

				// hash the password 
				let hashedPassword = await bcrypt.hash(password,10);

				//create a OTP of 4 DIGIT
				let otp = Math.floor(Math.random()*1000 ) +9000

				//create a new Investor Object 
				let investor = new Investor({
					name:name,
					email: email,
					password: hashedPassword,
					phone :phone,
					otp: otp
				});
				//store the investor details
				let response = await investor.save();
				
				// send OTP to phone 
				sendOTP(phone,otp);
				

				return res.status(201).json({
					error:false,
					id:response._id,
					message:"Investor registered !!"
				})
			}

		}
		if(userType === 's'){


			//check if the startup exists
			let result = await Startup.findOne({phone:phone});
			console.log('result = ',result);
			if(result){
				//set status
				return res.status(409).json({
					error:true,
					message:"Startup Exists"
				})
			}else{

				// hash the password 
				let hashedPassword = await bcrypt.hash(password,10);

				//create a OTP of 4 DIGIT
				let otp = Math.floor(Math.random()*1000 ) +9000

				//create startup object 
				let startup = new Startup({
					name:name,
					email:email,
					password:hashedPassword,
					phone:phone,
					otp:otp
				});

				//store the startup details
				let response = await startup.save();

				//send OTP				
				sendOTP(phone,otp);


				return res.status(201).json({
					error:false,
					id:response._id,
					message:"Startup Registered !!"
				})


			}

		}
		else{
			throw new Error('No user type provided')
		}

	}catch(err){
		return res.status(500).json({
			error:true,
			message:err.message
		})

	}
}


const verify = async (req,res)=>{
	try{
		let otp = req.body.otp;
		let id = req.body.id;
		let userType = req.body.type;

		if(userType === 'i'){
			let result = await Investor.findOne({_id:id});
			if(result.otp == otp){
				return res.status(200).json({
					error:false,
					message:"OTP verified"
				})
			}else{
				throw new Error("OTP  not verified");
			}
		}
		if(userType === 's'){
			let result = await Startup.findOne({_id:id});
			if(result.otp == otp){
				return res.status(200).json({
					error:false,
					message:"OTP verified"
				})
			}else{
				throw new Error("OTP not verified")
			}
		}

	}catch(err){
		return res.status(400).json({
			error:true,
			message:err.message
		})
	}
}


const login = async (req,res)=>{
	try{

		let email = req.body.email;
		let password = req.body.password;
		let userType = req.body.type

		if(userType === 'i'){
			//investor login
			let investor = await Investor.findOne({email:email});
			if(investor){
				//check for password
				let investorPassword = investor.password;
				let isCorrect = await bcrypt.compare(password,investorPassword);
				if(isCorrect){
					//create A JSON TOKEN
					let token = jwt.sign({
						id:investor._id,
						email:investor.email,
						type:'i'
					},SECRET);

					return res.json({
						error:false,
						token:token,
						user:{
							email:investor.email
						}
					})
				}else{
					throw new Error('Please Provide Correct Password')
				}
			}else{
				throw new Error('Investor Details Not Found')
			}
		}if(userType === 's'){
			//startup login
			let startUp = await Startup.findOne({email:email})
			if(startUp){
				//check for password
				let startUpPassword = startUp.password;
				let isCorrect = await bcrypt.compare(password,startUpPassword);
				if(isCorrect){
					// Create a JSON token
					let token = jwt.sign({
						id:startUp._id,
						email:startUp.email,
						type:'s'
					},SECRET);

					return res.json({
						error:false,
						token:token,
						email:startUp.email
					})

				}else{
					throw new Error('Please Provide Correct Password')
				}
			}else{
				throw new Error('Startup Details Not Found')
			}
		}else{
			throw new Error('userType not provided')
		}

	}catch(err){
		return res.json({
			err:true,
			message:err.message
		})
	}
}

module.exports = {
	test,
	verify,
	register,
	login
}