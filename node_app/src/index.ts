import * as express from 'express';
import {Express} from 'express';
class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
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

app.listen(port, (err: any) => {
    if (err) {
        return console.log(err);
    }

    return console.log(`server is listening on ${port}`);
});
