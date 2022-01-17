import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export default class App {
    public app: express.Application;
    public port: number = 3000;

    constructor(controllers: any, port: any) {
        this.app = express();
        this.port = port;

        this.app.use(cors());

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeControllers(controllers: any) {
        controllers.forEach((controller: any) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    public listen() {
        this.app.listen(this.port, () => {
            // console.log(`App listening on the port ${this.port}`);
        });
    }
}