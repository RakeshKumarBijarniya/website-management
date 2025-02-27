const multer = require("multer")

let storage = multer.diskStorage({
    destination:function (req,file,cb){
     cb(null,"./public/upload")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    },
})

let upload  = multer({
    storage:storage
})

module.exports =upload 