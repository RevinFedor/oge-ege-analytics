const express = require("express")
const user = require("../controller/user")

const router = express() 

router.post("/loginByToken", user.loginByToken)
router.post("/login", user.login)
router.post("/register", user.register)
router.get("/infoByToken", user.infoByToken)
router.post("/changeInfoUserByToken", user.changeInfoUserByToken)

module.exports = router 