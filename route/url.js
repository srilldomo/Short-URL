const express = require ("express")
const router = express.Router()
const {HandleGenerateURL, HandleGetAnalytics,HandleGetByID}  = require ("../controller/url")

router.post("/",HandleGenerateURL)
router.get("/analytics/:shortId",HandleGetAnalytics)
router.get("/:shortId",HandleGetByID )

module.exports = router
