import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes/index';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(routes);

export default server;
