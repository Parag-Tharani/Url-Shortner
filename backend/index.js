const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");
const authRouter = require("./routes/auth");
const UrlRoutes = require("./routes/url");


const Port = 8080

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res) => {
    res.send("Welcome Sir/Mam")
})

app.use(authRouter)
app.use(UrlRoutes)



connectDatabase()
.then(() => {
    app.listen(Port, () => {
        console.log(`Database initialized at http://localhost:${Port}`)
    })
})
.catch((err) => console.log("Error Connecting Database"))