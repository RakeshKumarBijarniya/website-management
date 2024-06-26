const mongoose = require("mongoose")
const querySchema = mongoose.Schema({
    query:{
        type:String,
        required:true
    },
    email:{
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
        default:'Need to Reply',
        required:true
    }
})

module.exports = mongoose.model("query",querySchema)