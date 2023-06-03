const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            users:      '/api/users',
        }

        this.connectToDB();
        this.middlewares();
        this.routes();
    }

    async connectToDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Read and parse body
        this.app.use(express.json());

        // Publid directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.categories, require('../routes/categories'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`)
        });
    }
    
}

module.exports = Server;