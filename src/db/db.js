const mongoose = require('mongoose');

// ConnectDb to conenct with db
async function connectDb() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("Database Connected Successfully");
    } catch (err) {
        console.log("Error connecting to database : ", err);
        process.exit(1);
    }
}

module.exports = connectDb; 