const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')
const path = require('path')
//import routes
const authRoutes  = require('./routes/auth')
const userRoutes  = require('./routes/user')
const categoryRoutes  = require('./routes/category')
const productRoutes  = require('./routes/product')
const braintreeRoutes  = require('./routes/braintree')
const orderRoutes  = require('./routes/order')

// app
const app = express()


//db
mongoose.connect(process.env.MONGO_URI,{
   useNewUrlParser: true,
   useCreateIndex: true ,
   useUnifiedTopology: true
}).then(()=> {console.log("DB connected")});

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://demo-ecoms.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors(corsOptions))

// routes middleware
app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",braintreeRoutes)
app.use("/api",orderRoutes)


//for production 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'client','build', 'index.html'));
    })
}

const port = process.env.PORT || 8000

app.listen(8000, ()=>{
    console.log(`Server is running on Port ${port}`)
})