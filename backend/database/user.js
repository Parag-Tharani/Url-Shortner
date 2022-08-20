const mongoose = require("mongoose")
const { isEmail } = require("validator")

const UserSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        validate: [ isEmail , 'invalid email format' ]
    },
    phone_number:{
        type:Number,
        trim:true,
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    Urls:[ String ]
})


const UserData = mongoose.model("UserData", UserSchema)

module.exports = UserData