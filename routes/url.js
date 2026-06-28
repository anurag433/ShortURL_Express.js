const express = require("express")
const { generateShortURL, getAnalytics } = require("../controllers/urls")

const router = express.Router() ;

router
    .post("/urls", generateShortURL)

router
    .get("/analytics/:shortID", getAnalytics)

module.exports = router ;