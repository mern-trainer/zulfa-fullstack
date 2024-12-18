const { connect } = require("mongoose")
require("dotenv").config()

const connectDb = async () => {
    const { connection } = await connect(process.env.DB_URL, {
        dbName: "sample_db"
    })
    console.log(connection.db.databaseName)
}

module.exports = connectDb