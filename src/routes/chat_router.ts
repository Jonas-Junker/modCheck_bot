import express from "express";

const chat_router = express.Router();

chat_router.ws('/:id', (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg);
  });
})

export default chat_router;
