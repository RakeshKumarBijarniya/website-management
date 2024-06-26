const testiTable = require("../model/testinominal")
const fs = require("fs")

exports.testiominalsForm = (req,res)=>{
    let message = ''
    res.render("testinominals.ejs",{message})

}
//user router
exports.testinominalsData = async(req,res)=>{
    let message = ''
    const filename = req.file.filename
    const {img,name,desc} = req.body
    const newTestinominals = new testiTable({image:filename,name:name,desc:desc,})
    newTestinominals.save()
    message = "Successfully Testinominals Sent"
    res.render("testinominals.ejs",{message})
}

// admin router

exports.testinominalsManagement = async(req,res)=>{
    const {loginname} = req.session
    const data =await testiTable.find()
    const totalTestinominal = data.length
    const totalPublishedTestinominal = await testiTable.find({status:"Published"}).count()
    const totalUnpublishedTestinominal = totalTestinominal-totalPublishedTestinominal
    res.render("admin/testimanagement.ejs",{loginname,data,totalTestinominal,totalPublishedTestinominal,totalUnpublishedTestinominal})
}


exports.changeTestiStatus = async(req,res)=>{
    const id = req.params.id
    const status = req.params.status
    
    if(status =="Unpulished"){
        await testiTable.findByIdAndUpdate(id,{status:"Published"})
    }
    else{
        await testiTable.findByIdAndUpdate(id,{status:"Unpulished"})
    }
    res.redirect("/admin/testimanagement")
}

exports.deleteTestinominal = async(req,res)=>{
    const id = req.params.id
    const image = req.params.image
    await testiTable.findByIdAndDelete(id)
    fs.unlinkSync(`./public/upload/${image}`)
    res.redirect("/admin/testimanagement")
}