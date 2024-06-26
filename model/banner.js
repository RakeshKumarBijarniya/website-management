const mongoose = require("mongoose")

const bannerSchema = mongoose.Schema({
    title:{
     type:String,
     required:true
    },
    desc:{
        type:String,
        required:true
       },
    image:{
        type:String,
       required:true
    },
    mdesc:{
        type:String,
        required:true
    },
   postedDate:{
        type:Date,
        default:new Date(),
        required:true
   },
   status:{
    type:String,
    required:true,
    default:"Unpublished"
   }
})

module.exports = mongoose.model("banner",bannerSchema)