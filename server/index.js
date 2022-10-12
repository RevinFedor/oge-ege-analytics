const express = require("express")
const cors = require("cors")
const userRouter = require("./routers/userRouter")
const mynicipalRouter = require("./routers/mynicipalRouter")

const PORT = process.env.PORT || 3001
const HOST = 'localhost' // 192.168.43.191
const app = express()

app.use(express.json())
app.use(cors())

app.use("/user", userRouter)
app.use("/api", mynicipalRouter)

app.listen(PORT, HOST, () => {
    console.log("server started on port: " + PORT)
})