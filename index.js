require('dotenv').config()
const express= require("express")
const path = require('path')
const connectDB=require("./routes/connection")
const urlroute=require("./routes/routesUrl")
const URL=require("./models/urlmodel")
const mongoDB= process.env.Mongo_Url
const app= express();
const Port = 3000;
app.set("view engine", "ejs")
app.set("voews", path.resolve("./views"));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//creating connection to DB
connectDB(mongoDB)
.then(()=>
console.log('mongodb connected')
)


app.use("/test", async(req,res )=>
{
    const allurls=await URL.find({});
    return res.render("home",
    {
        urls:allurls,
    })
})





app.use("/url",urlroute)
app.get("/:shortId",async(req,res)=>
{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate(
        {
        shortId,
        },
        {
            $push:
            {
                visitHistroy:
                {
                    timestamp: Date.now(),
                },
            },
        }
    ) 
    res.redirect(entry);
//here it was entry.redirectURL i changed to entry only cause its throwing error
})

app.listen(Port,()=>
{
    console.log(`server started at port ${Port}`)
})