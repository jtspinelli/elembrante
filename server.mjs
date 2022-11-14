import express from "express";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/', (_, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/registro', (_, res) => {
    res.sendFile(__dirname + '/registro.html');
});

app.get('/recados', (_, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`APP RUNNING ON PORT ${port}`);
});