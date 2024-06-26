
const router = require("express").Router()
//const regC = require("../controller/regsController")
const testinominalC = require("../controller/testinominalsController")
const bannerC = require("../controller/bannerController")
const servicC = require("../controller/serviceController")

const queryC = require("../controller/queryController")
const upload = require("../middleware/multer")
// router.get("/",(req,res)=>{
//    res.render("index.ejs")
// })

router.get("/mbanner",bannerC.moreDetailsBanner)

router.get("/serviceMoreDetails/:id",servicC.mserviceData)

// query router


// testnominal router
router.get("/testinominals",testinominalC.testiominalsForm)
router.post("/testinominals",upload.single('img'),testinominalC.testinominalsData)

module.exports =router