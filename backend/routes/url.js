const express = require("express")
const { getAllUrl, createShortUrl, clickShortUrl, deleteOutdatedUrl } = require("../handlers/url")
const updateUrl = require("../middleware/updateUrl")

const UrlRoutes = express.Router()

UrlRoutes.get('/getAllUrl', getAllUrl)
UrlRoutes.post('/createUrl', createShortUrl)
UrlRoutes.get('/:shortUrl',updateUrl, clickShortUrl)
UrlRoutes.delete("/deleteUrl", deleteOutdatedUrl)

module.exports = UrlRoutes