const mongoose = require('mongoose');

const dbConnection = async () => {
    let uri = process.env.MONGODB_ATLAS_URI;
    console.log(uri);

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected!');
    } catch (error) {
        throw new Error('Error trying to connect to database');
    }

}

module.exports = {
    dbConnection
}