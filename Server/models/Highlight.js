const mongoose = require("mongoose");

const highlightSchema = new mongoose.Schema(
    {
        url:{ 
            type: String, 
            required: true 
        },
        color:{ 
            type: String, 
            required: true 
        },
        text: {
            type: String,
            required: true,
        },
        user:{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        serializedRange:{
            type: mongoose.Schema.Types.Mixed
        },
        createdAt: {
            type:Date,
            default:Date.now
        },
    }
);

module.exports = mongoose.model("Highlight",highlightSchema);