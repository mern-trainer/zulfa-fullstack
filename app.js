const express = require("express")
const userRouter = require("./Routes/user.route")
const connectDb = require("./Config/mongodb")

const app = express()

connectDb()

app.use(express.json())
app.use("/api/users", userRouter)

app.listen(8080, err => {
    if (err) {
        return process.exit(1)
    }
    console.log("Running...")
})
