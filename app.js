const express = require("express")//function
const app = express()//module

const session = require("express-session")
require("dotenv").config()
require("./dbconnaction/dbconfiguration")
const userRouter  = require("./router/userRouter")
const adminRouter = require("./router/adminRouter")
const homeRouter = require("./router/home")

app.use(session({
    secret:process.env.SKEY,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1*1000*60*6*24}
}))

app.use(express.urlencoded({extended:false}))

app.use(express.static("public"))
app.set("view engine","ejs")

app.use(express.json())
app.use(homeRouter)
app.use('/users',userRouter)
app.use("/admin",adminRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server is runing on port ${process.env.PORT}`)
})