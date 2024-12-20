const jwt = require("jsonwebtoken")
require("dotenv").config()

const Auth = (request, response, next) => {
    try {
        const tokenData = request.headers["authorization"]
    // Bearer ehsdfdflksdjflsjdfscmvlsjdoifjmsldkf
    const [_, token] = tokenData.split(" ")
    if (!token) {
        return response.status(401).send({ message: "Unauthorized" });
    }
    const res = jwt.verify(token, process.env.JWT_KEY)
    if (!res) {
        return response.status(401).send({ message: "Unauthorized" }); 
    }
    next()
    } catch (err) {
        return response.status(401).send({ message: "Unauthorized" }); 
    }
}

module.exports = Auth