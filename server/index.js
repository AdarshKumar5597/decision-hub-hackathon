const express = require("express");
const app = express();

const dotenv = require("dotenv");
const database = require("./config/database");
const cors = require("cors");
const ruleRoutes = require('./routes/ruleRoutes')

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: '/tmp'
}))

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

// routes
app.use("/api/v1/rules", ruleRoutes);

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

