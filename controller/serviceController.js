const serviceTable = require("../model/service")
const fs = require("fs")


exports.servicemanagement= async(req,res)=>{
    let message = ""
    const {loginname} = req.session
    try{ 
    var data = await serviceTable.find()
    var totalServiceRecord = await serviceTable.find().count()
    var totalPublishRecord = await serviceTable.find({status:"Published"}).count()
    var totalUnpublishRecord = await serviceTable.find({status:"Unpublished"}).count()
    
    if(data.length === 0){
        throw new Error("No Record Found")
    }
    }catch(e){
        message = e.message
    }   
    res.render("admin/servicmanagement.ejs",{loginname,data,message,totalServiceRecord,totalPublishRecord,totalUnpublishRecord})
}

exports.serviceForm = (req,res)=>{
    let message = ""
    const {loginname} = req.session
    res.render("admin/serviceForm.ejs",{loginname,message})
}

exports.newService = (req,res)=>{
    const {loginname} = req.session
    let message =""
    
    try{
        const {img,name,desc,mdesc} = req.body
       if(!name || !desc || !mdesc ){
         throw new Error("All fields are compulsory fields, Please fill all fields")
       }
       else if(!req.file){
        throw new Error("Service Image is Required!!! Please upload Image")
    }
    const filename = req.file.filename
    const newServiceAdd = new serviceTable({name:name,desc:desc,mdesc:mdesc,image:filename})
    newServiceAdd.save()
    message = "Successfully Service has been Added!!!"

    }catch(error){
        message = error.message
    }
    res.render("admin/serviceForm.ejs",{loginname,message})
}


exports.deleteService = async(req,res)=>{
    const id = req.params.id
    const image = req.params.image
    console.log(req.params.id)
    await serviceTable.findByIdAndDelete(id)
    fs.unlinkSync(`./public/upload/${image}`)
    res.redirect("/admin/servicmanagement")

}

exports.serviceStatusUpdate = async(req,res)=>{
    const id = req.params.id
    const currentStatus = req.params.status
    if(currentStatus ==="Unpublished"){
        await serviceTable.findByIdAndUpdate(id,{status:"Published"})
    }
    else{
        await serviceTable.findByIdAndUpdate(id,{status:"Unpublished"})
    }
    res.redirect("/admin/servicmanagement")
    
}

// user Router /service data---------------->
exports.mserviceData =  async(req,res)=>{
    const id = req.params.id
    const mservicedata =await serviceTable.findById(id)
    //console.log(mservicedata)
    res.render("mService.ejs",{mservicedata}) 
    
}