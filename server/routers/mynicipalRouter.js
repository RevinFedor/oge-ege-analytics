const express = require("express")
const mynicipal = require("../controller/mynicipal")

const routerMynicipal = express() 

routerMynicipal.post("/mynicipal", mynicipal.InfoMynicipal)
routerMynicipal.post("/infoSchoolsFull", mynicipal.infoSchoolsFull)

module.exports = routerMynicipal 