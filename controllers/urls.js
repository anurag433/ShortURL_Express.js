const { nanoid } = require("nanoid")
const URL = require("../models/urls")
const generateShortURL = async (req, res) => {
    const body = req.body ;
    
    if(! body.original_url){
        return res.status(400).json({
            err : "Url is required"
        })
    }

    if (!body.original_url.startsWith("http://") && !body.original_url.startsWith("https://")){
        body.original_url = "https://" + body.original_url;
    }

    const shortID = nanoid(5)
    await URL.create({
        shortID  : shortID ,
        redirectURL : body.original_url,
        visitHistory : []

    }) 

    return res.json({
        id: shortID,
        short_url : `${req.protocol}://${req.get("host")}/${shortID}`
    })
}

const getAnalytics = async (req, res) => {
    const shortID = req.params.shortID
    const result = await URL.findOne({shortID})
    return res.json({
        totalclicks : result.visitHistory.length,
        analytics : result.visitHistory,
    })
}



module.exports = {
    generateShortURL,
    getAnalytics,
}