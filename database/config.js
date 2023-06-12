const mongoose = require('mongoose');

const dbConnection = async () => {
    let uri = process.env.MONGODB_ATLAS_URI;

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

const getDbCollections = async () => {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => {
        return {
            name: collection.name
        };
    });
    return collectionNames;
};


module.exports = {
    dbConnection,
    getDbCollections
}