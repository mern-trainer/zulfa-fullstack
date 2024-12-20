const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

const userCollection = model("users", userSchema)

module.exports = userCollection