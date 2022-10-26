const express = require("express")
const mynicipal = require("../controller/mynicipal")

const routerMynicipal = express() 

routerMynicipal.post("/mynicipal", mynicipal.InfoMynicipal)
routerMynicipal.post("/infoSchoolsFull", mynicipal.infoSchoolsFull)
routerMynicipal.post("/infoFullItems", mynicipal.infoFullItems)
routerMynicipal.post("/yearAll", mynicipal.yearAll)

module.exports = routerMynicipal