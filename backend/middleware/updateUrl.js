const UrlData = require("../database/url");

async function updateUrl(req,res,next){
    const { city } = req.body
    const { shortUrl } = req.params

    let existingUrl = await UrlData.findOne({shortUrl})

    if(existingUrl){
        existingUrl.click_count = existingUrl.click_count+1

        existingUrl.location.map((items) => {

            if(items.city === city){
                items.value = items.value+1
            }
            else{
                let data = {
                    city:city,
                    value:1
                }
                existingUrl.location.push(data)
            }
            
        })

        await UrlData.findOneAndUpdate({shortUrl}, {click_count:existingUrl.click_count, location:existingUrl.location})
    }

    next()
}


module.exports = updateUrl