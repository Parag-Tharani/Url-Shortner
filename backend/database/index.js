const mongoose = require("mongoose")
require('dotenv').config();

async function connectDatabase(){
    const db_Url = process.env.db_Url

    try {
        await mongoose.connect(db_Url)
        console.log("Database Connection Successful.")
    } catch (error) {
        throw error
    }
}

module.exports = connectDatabase