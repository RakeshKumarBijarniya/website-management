const router = require("express").Router()

const testiTable = require("../model/testinominal") 
const queryC = require("../controller/queryController")
const bannerTable = require("../model/banner")
const serviceTable = require("../model/service")

router.get("/",async(req,res)=>{
    const serviceData = await serviceTable.find({status:"Published"})
    const testinominalsData = await testiTable.find({status:"Published"})
    const bannerData  = await bannerTable.findOne({status:"Published"})
    res.render("index.ejs",{bannerData,serviceData,testinominalsData})
 })

 router.post("/",queryC.addQuery)


module.exports =router