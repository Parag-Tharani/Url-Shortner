const mongoose = require("mongoose")

async function connectDatabase(){
    const db_Url = "mongodb://localhost:27017/Url_Shortner"
    // "mongodb+srv://ParagTharani:2324password2324@cluster0.1hiejwx.mongodb.net/Url_Shortner"
    // "mongodb://localhost:27017/Url_Shortner"

    try {
        await mongoose.connect(db_Url)
        console.log("Database Connection Successful.")
    } catch (error) {
        throw error
    }
}

module.exports = connectDatabase