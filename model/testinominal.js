const mongoose = require("mongoose")

const testinominalSchema = mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },createdData:{
        type:Date,
        required:true,
        default:new Date()
    },
    status:{
        type:String,
        required:true,
        default:"Unpulished"
    }
})

module.exports = mongoose.model("testinominals",testinominalSchema)