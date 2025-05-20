const express= require("express")
const dotenv= require("dotenv");
const { dbConnect } = require("./database/dbConfig");

dotenv.config();

const app= express();
const cors= require("cors");
const cookieParser= require("cookie-parser")
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const compression = require("compression");
const sanitizeMiddleware = require("./middlewares/sanitizeInput");


const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
});


const corsOptions = {
  origin: process.env.FE_DOMAIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'X-CSRF-Token'
  ],
  exposedHeaders: [
    'Content-Range',
    'X-Content-Range',
    'X-Total-Count',
    'Set-Cookie'
  ],
  credentials: true,
  maxAge: 86400,
  preflightContinue: false,
  optionsSuccessStatus: 204
};


app.use(cors(corsOptions));
app.use(compression());
app.use(express.json())
app.use(cookieParser())
app.use(sanitizeMiddleware);
app.use(limiter);
app.use(hpp());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", process.env.FE_DOMAIN].filter(Boolean),
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);




app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});
const indexModel= require("./models/indexModel")


const authRoute=require("./routes/authRoute");
const profileRoute=require("./routes/profileRoute");
const otpRoute=require("./routes/otpRoute");
const expenseRoute= require("./routes/expenseRoute");


app.use("/api",authRoute)
app.use("/api",profileRoute);
app.use("/api",otpRoute)
app.use("/api",expenseRoute)



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
