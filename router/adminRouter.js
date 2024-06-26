const router = require("express").Router()
const regC = require("../controller/regsController")
const bannerC = require("../controller/bannerController")
const servicC = require("../controller/serviceController")
const queryC = require("../controller/queryController")
const testinominalC = require("../controller/testinominalsController")
const handlelogin = require("../middleware/sessioncheck")
const upload = require("../middleware/multer")



router.get("/",regC.adminForm)
router.post("/",regC.logindata)

router.get("/dashboard",handlelogin,(req,res)=>{
    const {loginname} = req.session
    res.render("admin/admindashboard.ejs",{loginname})
})

// bannermanagement router part
router.get("/newbanner",handlelogin,bannerC.bannerForm)
router.post("/newbanner",upload.single('img'),bannerC.newBanner)
router.get("/bannermanagement",handlelogin,bannerC.bannermanagement)
router.get("/deleteBanner/:id/:image",handlelogin,bannerC.deletebanner)
router.get("/updateBanner/:id",handlelogin,bannerC.updateBannerForm)
router.post("/updateBanner/:id",upload.single('img'),bannerC.updateBanner)
router.get('/bannersUpdate/:status/:id',bannerC.statusUpdate)
    
//service management router part
router.get("/servicmanagement",handlelogin,servicC.servicemanagement)
router.get("/newService",handlelogin,servicC.serviceForm)
router.post("/newService",upload.single('img'),servicC.newService)
router.get("/serviceDelete/:id/:image",handlelogin,servicC.deleteService)
router.get('/serviceStatusUpdate/:id/:status',servicC.serviceStatusUpdate)

// testimanagement router part 
router.get("/testimanagement",handlelogin,testinominalC.testinominalsManagement)
router.get("/changeStatus/:id/:status",handlelogin,testinominalC.changeTestiStatus)
router.get("/deleteTesti/:id/:image",handlelogin,testinominalC.deleteTestinominal)



// query management router 
router.get("/query/:message",handlelogin,queryC.allqueryData)

router.get("/queryForm/:email/:query/:id",queryC.queryForm)
router.post("/queryForm/:email/:query/:id",queryC.sendEmail)
router.get("/deleteQuery/:id",handlelogin,queryC.deleteQuery)

router.get("/logout",regC.logout)
module.exports = router