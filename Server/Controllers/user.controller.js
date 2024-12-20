const userCollection = require("../Models/user.model");
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        const { body } = req
        const usernameCount = await userCollection.countDocuments({ username: body.username });
        if (usernameCount > 0) {
            return res.status(409).send({
                message: "Username already exist"
            })
        }
        const emailCount = await userCollection.countDocuments({ email: body.email });
        if (emailCount > 0) {
            return res.status(409).send({
                message: "Email already exist"
            })
        }
        body.password = await bcrypt.hash(body.password, 10);
        const response = await userCollection.create(body)
        if (!response?._id) {
            return res.status(400).send({
                message: "Bad Request"
            })
        }
        response.password = null
        const token = jwt.sign({sub: response}, process.env.JWT_KEY, {expiresIn: "7d"})
        return res.status(201).send({
            message: "user created",
            user: response,
            token
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.query
        const user = await userCollection.findOne({ username });
        if (!user) {
            return res.status(404).send({
                message: "User does not exist"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).send({
                message: "Invalid credentials"
            })
        }
        user.password = null
        const token = jwt.sign({sub: user}, process.env.JWT_KEY, {expiresIn: "7d"})
        return res.status(200).send({
            message: "user loggedin",
            user, token
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

const products = async (req, res) => {
    try {
        const response = await fetch("https://dummyjson.com/products")
        const result = await response.json()
        return res.status(200).send({
            message: "done",
            result
        }) 
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Internal server error"
        })
    }
}

module.exports = {
    login, signup, products
}