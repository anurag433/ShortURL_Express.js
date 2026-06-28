const express = require("express")
const urlRoute = require("./routes/url")
const URL = require("./models/urls")
const {} = require("./connection");
const connectToMongoDB = require("./connection");
require("dotenv").config();
const cors = require("cors");

const app = express()
const PORT = 8000 ;

// Middleware
app.use(cors()); 
app.use(express.json())

connectToMongoDB(process.env.MongoDB_URL)
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

module.exports = app;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log("Server Started!");
    });
}