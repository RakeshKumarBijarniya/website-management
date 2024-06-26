const bannerTable = require("../model/banner")
const fs = require("fs")

exports.bannermanagement = async(req,res)=>{
    const {loginname} = req.session
    const data = await bannerTable.find()
    res.render("admin/bannermanagement.ejs",{loginname,data})
} 

exports.bannerForm = (req,res)=>{
    let message = ""
    const {loginname} = req.session
   res.render("admin/bannerform.ejs",{loginname,message})
}

exports.newBanner = (req,res)=>{
    const {loginname} = req.session
    let message ="";
    try{
    const {title,desc,mdesc} = req.body
    if (!title ){
        throw new Error("All fields are compulsory fields, Please fill title field")
    }
    else if (!desc){
        throw new Error("All fields are compulsory fields, Please fill description field ")
    }
    else if (!mdesc){
        throw new Error("All fields are compulsory fields, Please fill more details field")
    }
    else if(!req.file){
        throw new Error("Banner Image is Required!!! Please upload Image")
    }
    const filename = req.file.filename
    const newBanner=  new bannerTable({ title:title,desc:desc,mdesc:mdesc,image:filename})
    newBanner.save()
    message = "Successfully Banner has been Added!!!"
    console.log("Add Banner")
    }catch(error){
        message = error.message
        console.log(error.message)
    }
    res.render("admin/bannerform.ejs",{loginname,message})
}

exports.deletebanner = async(req,res)=>{
    const id = req.params.id
    const image = req.params.image
    await bannerTable.findByIdAndDelete(id)
    fs.unlinkSync(`./public/upload/${image}`)
    res.redirect("/admin/bannermanagement")
}

exports.updateBannerForm = async(req,res)=>{
    const {loginname} = req.session
    const id = req.params.id
    const bannerData = await bannerTable.findById(id)
    res.render('admin/updateBanner.ejs',{bannerData,loginname})
}

exports.updateBanner = async(req,res)=>{
    const id = req.params.id
    let message = ""
    try{
    const data = await bannerTable.findById(id)
    const image = data.image
    const {title,desc,mdesc} = req.body
    if(req.file){
        const filename = req.file.filename
        await bannerTable.findByIdAndUpdate(id,{ title:title,desc:desc,mdesc:mdesc,image:filename})
       fs.unlinkSync(`./public/upload/${image}`)
       
    }else{
        await bannerTable.findByIdAndUpdate(id,{ title:title,desc:desc,mdesc:mdesc})
    }
    }catch(e){
        message = e.message
}

    
   
    message = "Update Successfully"
    res.redirect("/admin/bannermanagement")
}

// exports.statusUpdate = async(req,res)=>{
//     const currentStatus = req.params.status
//     console.log(currentStatus)
//     const id =  req.params.id
//     // let updatedStatus = null
//     //     if(currentStatus =="Unpublished"){
//     //       updatedStatus = "Published"
//     //     }
//     //     else{
//     //         updatedStatus = "Unpublished"
//     //     }

       
//      
//        // await bannerTable.findByIdAndUpdate(id,{status: updatedStatus})
//         res.redirect("/admin/bannermanagement")
//     }

exports.statusUpdate = async(req,res)=>{
    const currentStatus = req.params.status
    
    const id =  req.params.id

    if(currentStatus =="Unpublished"){
        await bannerTable.updateMany({$set:{status:"Unpublished"}})
        await bannerTable.findByIdAndUpdate(id, {status: "Published"})
    }
    else{
            const data =   await bannerTable.updateOne({status:currentStatus},{$set:{status:"Unpublished"}})
    }
    res.redirect("/admin/bannermanagement")
}



// user router / Banner data---------------->

// exports.bannerData = async(req,res)=>{
//     const bannerData  = await bannerTable.findOne({status:"Published"})
//     res.render("index.ejs",{bannerData})
//  }

exports.moreDetailsBanner = async(req,res)=>{
    const bannerData  = await bannerTable.findOne({status:"Published"})
    res.render("mbanner.ejs",{bannerData})
 }

