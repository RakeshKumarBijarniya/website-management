const regTable = require("../model/regs")

exports.adminForm = async(req,res)=>{
    res.render("admin/loginpage.ejs",{message:""})
   
}


exports.logindata = async(req,res)=>{
    try{
    const {username,password} = req.body
    if (!username){
         throw new Error("Username should not be blank!!!")
    }
    if(!password){
        throw new Error("Password should not be blank!!!")
    }
    const dataRetrive = await regTable.findOne({username})
    if (dataRetrive != null){
         if(dataRetrive.password == password){
            req.session.isAuth  = true
            req.session.loginname = username
            res.redirect("/admin/dashboard")
         }
         else{
            res.render("admin/loginpage.ejs",{message:"Password not matched"})
         }
    }
    else{
        res.render("admin/loginpage.ejs",{message:"Username not registered"})
    }
    
}catch(error){
    res.render("admin/loginpage.ejs",{message:error.message})
}  
}

exports.logout = (req,res)=>{
    req.session.destroy()
    res.redirect("/admin/")
}