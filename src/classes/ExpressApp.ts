import express, {NextFunction, Response, Request} from "express";
import * as http from "http";
import {debug} from "util";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyParser from "body-parser";
import morgan from "morgan";
import twitch_router from "../routes/twitch_router";
import auth_router from "../routes/auth_router";
import WebSockets from "./WebSockets";

dotenv.config();

export default class ExpressApp {
    private readonly port;
    private config;
    private readonly app: any;
    private server;
    private wss;

    constructor(param: any) {
        this.port = process.env.PORT ?? 6060;
        this.config = param.config;
        this.app = express();

        // Create HTTP server
        this.server = http.createServer(this.app);
        this.wss = new WebSockets(this.server);

        this.server.listen(this.port);
        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());

        // Root Route
        this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.render('index', {title: 'Express'});
        })

        this.app.use('/api/twitch', twitch_router);
        this.app.use('/api/auth', auth_router);

        console.log('Started Server: Express + WebSocket on port', this.port);
    }

    // Event listener for HTTP server "listening" event
    onListening() {
        const addr = this.server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
        debug('Listening on ' + bind);
    }


    // Event listener for HTTP server "error" event
    onError(error: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}
