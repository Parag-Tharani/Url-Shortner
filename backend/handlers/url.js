const UrlData = require("../database/url");
const shortid = require('shortid');
const UserData = require("../database/user");
const jwt = require("jsonwebtoken");
const SECRET = "thisissecretkeyfortwitterappcloneś"


async function findOneUser(req,res){
    const { id } = req.body

    let existingUser = await UserData.findOne({_id:id})

    if(existingUser){
        return res.send(existingUser)
    }else{
        return res.status(404).send("Wrong token provided")
    }
}

async function getAllUrl(req,res){
    const { skip , limit} = req.query

    let allUrl = await UrlData.find().skip(skip).limit(limit)

    return res.send(allUrl)
}


async function deleteOutdatedUrl(req,res){
    const { id } = req.body

    try {
        await UrlData.findOneAndDelete(id)
        return res.send("Url Deleted")
    } catch (error) {
        return res.status(500).send(error)
    }

}

async function findUrl(req,res){

    const { shortUrl } = req.body

    try {
        let urlData = await UrlData.findOne({shortUrl})

        if(urlData){
            return res.send(urlData)
        }else{
            return res.status(404).send("Url not Found")   
        }
    } catch (error) {
     return res.status(404).send("Url not Found")   
    }

}



async function createShortUrl(req,res){
    let { longUrl, shortUrl } = req.body
    let { token } = req.headers

    if(shortUrl === undefined || shortUrl === ""){
        shortUrl = shortid.generate()
    }

    let existingUrl = await UrlData.findOne({shortUrl})


    if(token === null || token === undefined || token === ""){
        return res.send("Please Login first to send any request")
    }
    else{
        const decode_token = jwt.decode(token,SECRET)
        
        try {
            
        let existingUser = await UserData.findById(decode_token.id)

        if(existingUser){
        if(existingUrl === null){

            const body = {
                longUrl,
                shortUrl,
                click_count:0
            }

            await UrlData.create(body)
            
            existingUser.Urls.push(shortUrl)
            await UserData.findOneAndUpdate({_id:decode_token.id}, {Urls:existingUser.Urls})

            return res.status(201).send("Url Shorten Successfully")

        }
        else{
            return res.status(409).send("Short Url already exists")
        }
    }else{
        return res.status(400).send("token invalid")
    }
    
    } catch (error) {
        
        if(error.errors.longUrl){
            return res.status(406).send("Please provide a valid url")
        }else{
            return res.status(500).send(error)
        }

    }
}
    
}




async function clickShortUrl(req,res){
    const { shortUrl } = req.params

    let existingUrl = await UrlData.findOne({shortUrl})

    if(existingUrl){
        return res.send({longUrl:existingUrl.longUrl})
    }else{
        res.status(404).send("Shorten Url Does not exists")
    }
}


module.exports = {
    findOneUser,
    getAllUrl,
    findUrl,
    createShortUrl,
    clickShortUrl,
    deleteOutdatedUrl
}