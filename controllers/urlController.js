const shortid = require('shortid')
const URL =require("../models/urlmodel") 
async function generateNewShortURL(req,res)
{
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})
    const shortID= shortid();

    await URL.create(
        {
            shortId:shortID,
            redirectURL:body.url,
            visitHistroy:[],

        }
    )
    return res.json({id:shortID})

}


async function getNewShortURL(req,res)
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
    res.redirect(entry.redirectURL)

}

async function handleAnalaytics(req,res)
{
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId})
    return res.json({
        totalClicks:result.visitHistroy.length,
        analytics:result.visitHistroy,
    })
}




module.exports=
{
    generateNewShortURL,
    getNewShortURL,
    handleAnalaytics
}