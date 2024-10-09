const express = require("express");
const { connect } = require("./config/database");
const authRoutes = require("./routes/Auth")
const app = express();
app.use(express.json())
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 4000;
connect()

app.listen(PORT , () => {
    console.log("App is up and running"); 
})

app.use("/api/v1/auth" , authRoutes)

app.get("/" , (req , res) => {
    res.send("App is up and running")
})