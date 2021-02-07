const Investor = require('../models/Investor.model');
const Startup = require('../models/Startup.model');

const list = async (req,res)=>{
	try{

		//receive the user.type from the token 
		let userType = req.user.type;

		if(userType === 'i'){
			//fetch all the startup details
			let startupList = await Startup.find({});
			let serializedData = startupList.map(element=>{
				return {
					id:element._id,
					name:element.name,
					email:element.email,
					phone:element.phone
				}
			})

			return res.json({
				error:false,
				list:serializedData
			})
		}
		if(userType === 's'){
			//fetch all the investor details
			let investorList = await Investor.find({});
			let serializedData = investorList.map(element=>{
				return {
					id:element._id,
					name:element.name,
					email:element.email,
					phone:element.phone
				}
			});

			return res.json({
				error:false,
				list:serializedData
			}) 
		}


	}catch(err){
		return res.json({
			error:false,
			message:err.message
		})
	}
}


module.exports = {
	list
}