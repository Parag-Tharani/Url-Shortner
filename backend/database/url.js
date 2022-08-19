const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    longUrl:{
        type:String,
        match: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/ ,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    },
    click_count:{
        type:Number
    },
    location:[{
        city:{
            type:String
        },
        value:{
            type:Number
        }
    }],
    time:{
        type: Date,
        default: Date.now
    }
})

const UrlData = mongoose.model("UrlData", urlSchema)

module.exports = UrlData