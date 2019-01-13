"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            });
        });
        router.get('/chicken', (req, res) => {
            res.json({
                message: 'Hello chicken!'
            });
        });
        this.express.use('/', router);
    }
}
const port = process.env.PORT || 3000;
let app = new App().express;
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map