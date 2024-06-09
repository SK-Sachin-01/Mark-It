const mongoose = require('mongoose');

require("dotenv").config();

const dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {console.log("DB Connection Successful")})
    .catch((error) => {
        console.log("DB Error");
        console.error(error.message);
        process.exit(1);
    })
}

module.exports = dbconnect;