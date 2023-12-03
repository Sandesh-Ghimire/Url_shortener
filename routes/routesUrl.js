const express = require('express')
const router = express.Router();

const {generateNewShortURL,getNewShortURL,handleAnalaytics}=require("../controllers/urlController")



router.post('/',generateNewShortURL)
router.get('/:shortId',getNewShortURL)
router.get('/analytics/:shortId',handleAnalaytics)

module.exports=router;