const queryTable = require('../model/query') 
const nodemailer = require("nodemailer");
require('dotenv').config()


exports.addQuery = (req,res)=>{
    const {email,query} = req.body
    const addNewQuery = new queryTable({email:email,query:query})
     addNewQuery.save()
     res.render("message.ejs")
}

exports.allqueryData=async(req,res)=>{
    const data = await queryTable.find()
    const loginname = req.session.loginname
    const message = req.params.message
    res.render("admin/query.ejs",{loginname,data,message})
}

exports.queryForm = (req,res)=>{
    const {loginname} = req.session
    let message =""
    const email = req.params.email
    const query = req.params.query
    res.render("admin/queryForm.ejs",{loginname,email,query,message})
}

exports.sendEmail= async(req,res)=>{
    const {emailto,emailfrom,emailsub,emailbody} = req.body
    let message =""
    const {loginname} = req.session
    const email = req.params.email
    const query = req.params.query
    const id = req.params.id
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user:process.env.EMAILUSERNAME,
          pass: process.env.PASSWORD,
        },
      })

     transporter.sendMail({
        from: emailfrom, // sender address
    to: emailto, // list of receivers
    subject:emailsub, // Subject line
    text: emailbody, // plain text body
   // html: "<b>Hello world?</b>"
    })

    await queryTable.findByIdAndUpdate(id,{status:"Reply has been sent"})
    message = "Email has been sent!!!"
    res.render("admin/queryForm.ejs",{loginname,email,query,message})
    
}


exports.deleteQuery = async(req,res)=>{
    const id = req.params.id
    await queryTable.findByIdAndDelete(id)
    res.redirect('/admin/query/Successfully Query has been deleted')
}