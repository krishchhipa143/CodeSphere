const express = require("express")
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./Config/db")

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB()

app.use("/api/auth", require("./Routes/authRoutes"))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>
    console.log(`sever in running on ${PORT} port`)
)
