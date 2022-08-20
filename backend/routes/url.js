const express = require("express")
const { getAllUrl, createShortUrl, clickShortUrl, deleteOutdatedUrl, findOneUser, findUrl } = require("../handlers/url")
const updateUrl = require("../middleware/updateUrl")

const UrlRoutes = express.Router()

UrlRoutes.post('/getUser', findOneUser)
UrlRoutes.get('/getAllUrl', getAllUrl)
UrlRoutes.post('/findUrl', findUrl)
UrlRoutes.post('/createUrl', createShortUrl)
UrlRoutes.post('/:shortUrl',updateUrl, clickShortUrl)
UrlRoutes.delete("/deleteUrl", deleteOutdatedUrl)

module.exports = UrlRoutes