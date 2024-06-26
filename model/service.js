const mongoose = require("mongoose")

const serviceSchema =  mongoose.Schema({
    image:{
      required:true,
      type:String
    },
    name:{
        required:true,
        type:String
    },
    desc:{
        required:true,
        type:String
    },
    mdesc:{
        required:true,
        type:String
    },
    createDate:{
        required:true,
        type:Date,
        default:new Date()
    },
    status:{
        type:String,
        required:true,
        default:"Unpublished"
       }
})

module.exports = mongoose.model("service",serviceSchema)