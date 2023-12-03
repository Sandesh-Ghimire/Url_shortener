require('dotenv').config()
const express= require("express")
const connectDB=require("./routes/connection")
const urlroute=require("./routes/routesUrl")
const URL=require("./models/urlmodel")
const mongoDB= process.env.Mongo_Url
const app= express();
const Port = 3000;
app.use(express.json())

//creating connection to DB
connectDB(mongoDB)
.then(()=>
console.log('mongodb connected')
)

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
    res.redirect(entry.redirectURL);

})

app.listen(Port,()=>
{
    console.log(`server started at port ${Port}`)
})