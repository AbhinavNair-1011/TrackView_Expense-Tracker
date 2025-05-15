const express= require("express")
const dotenv= require("dotenv");
const { dbConnect } = require("./database/dbConfig");

dotenv.config();

const app= express();
const cors= require("cors")

app.use(express.json())
app.use(cors())

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
