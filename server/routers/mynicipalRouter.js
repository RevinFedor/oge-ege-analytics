const express = require("express")
const mynicipal = require("../controller/mynicipal")

const routerMynicipal = express() 

routerMynicipal.post("/mynicipal", mynicipal.InfoMynicipal)
routerMynicipal.post("/infoSchoolsFull", mynicipal.infoSchoolsFull)
routerMynicipal.post("/infoFullItems", mynicipal.infoFullItems)

module.exports = routerMynicipal 