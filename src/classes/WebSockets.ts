import {WebSocket} from "ws";
import * as http from "http";
import {ChatMessage} from "../models/ChatMessage";


export default class WebSockets {
    public connections: any[] = [];
    private wss;

    constructor(server: http.Server) {
        this.wss = new WebSocket.Server({server});

        this.wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
            console.log('New Connection');

            ws.on('message', (msg: string) => {
                const message: ChatMessage = JSON.parse(msg);

                const answer = {
                    data: {
                        id: '123',
                        date: new Date(),
                        latitude: 0,
                        longitude: 0,
                        text: 'Hello',
                        type: 'text',
                        user: {
                            name: 'Server'
                        },
                        reply: false
                    } as ChatMessage
                }

                this.wss.clients.forEach((client) => {
                    client.send(JSON.stringify(answer));
                })
            })

            ws.on('close', () => {
                console.log('Connection Closed');
            })
        })


    }

}
