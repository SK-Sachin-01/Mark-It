const express = require('express');
const app = express();

const userRoutes = require("./routes/userRoutes");
const highlightRoutes = require("./routes/highlightRoutes");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dbconnect = require('./config/database');


const PORT = process.env.PORT || 4000;

dbconnect();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)


app.use("/api/v1/highlight", highlightRoutes);
app.use("/api/v1/auth", userRoutes);

app.get("/", (req,res) => {
	res.send(`<h1>This is Home Page</h1>`);
})

app.listen(PORT, () => {
    console.log(`Server Connected Successfully at Port No. ${PORT}`)
})

