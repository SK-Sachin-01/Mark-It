// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header
		// console.log("res: ",res.body);
		// console.log("req.body: ",req.body);
		// console.log("req.cookies: ",req.cookies);
		// console.log("req.header: ",req.header);
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			console.log("Token Missing");
			return res.status(401).json({ 
				success: false, 
				message: `Token Missing`
			});
		}

		// console.log("token: ",token);

        try {
			console.log("auth middleware ke try ke andar hu")
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			// console.log("decode: ",decode);
            const user = await User.findOne({ _id: decode.id});
            if (!user) {
              throw new Error();
            }
			// console.log("user: ",user);
			req.token = token;
            req.user = user;
            next();
          } 
		  catch (error) {
			console.log("Authentication required")
            res.status(401).send({ error: 'Authentication required' });
          }
	} 
	catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		console.log("Something Went Wrong While Validating the Token")
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};