const mongoose = require("mongoose");

const careerFormSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String
    }
})

const CareerForm = mongoose.model("CareerForm", careerFormSchema)

module.exports = CareerForm