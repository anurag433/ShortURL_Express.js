const express = require("express")
const urlRoute = require("./routes/url")
const URL = require("./models/urls")
const {} = require("./connection");
const connectToMongoDB = require("./connection");

const app = express()
const PORT = 8000 ;

// Middleware
app.use(express.json())

connectToMongoDB("mongodb+srv://anurag_db:Phase4140@cluster0.ckb1ol4.mongodb.net/url-shortener?appName=Cluster0")
.then(() => {
    console.log("MongoDB connected !");
})
.catch((err, data) => {
    console.log(err);
})

app.use("/api/v1", urlRoute)

app.get("/:shortID", async(req, res) => {
    const shortID = req.params.shortID 
    const entry = await URL.findOneAndUpdate({
        shortID,
    }, 
    {$push :{
        visitHistory : {
            timestamp : Date.now()
        },
        }
    }
    )
    res.redirect(entry.redirectURL)
})

app.listen(PORT, ((err, data) => {
    console.log("Server Started !");
    
}))