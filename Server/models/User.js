const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,
        },
        lastName:{
            type:String,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
        },
        highlight:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Highlight",
        }],
        token: {
			type: String,
		},
        image: {
			type: String,
			required: true,
		},
    }
);

module.exports = mongoose.model("User",userSchema);