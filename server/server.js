const express= require("express")
const dotenv= require("dotenv");
const { dbConnect } = require("./database/dbConfig");

dotenv.config();

const app= express();
const cors= require("cors");
const cookieParser= require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
  origin:"http://localhost:5174",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
//   maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const indexModel= require("./models/indexModel")


const authRoute=require("./routes/authRoute")

app.use("/api",authRoute)



const port = process.env.SERVER_PORT || 3000

dbConnect(()=>{
     app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server is running on port ${port}`);
    }
})
})
