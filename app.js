const express = require('express')
const userRouter  = require('./routes/user.routes')
const dotenv = require('dotenv') ; 
dotenv.config() ; 
const connectToDB = require('./config/db')
connectToDB() ; 
const cookieParser = require('cookie-parser') ;
const indexRouter = require('./routes/index.routes') ;

const app  = express() ; 

app.use(express.json()) ; 
app.use(express.urlencoded({extended:true}) )  ;
app.set("view engine" , "ejs")
app.use(cookieParser()) ;


app.use('/user' , userRouter)
app.use('/' , indexRouter)



app.listen(3000)