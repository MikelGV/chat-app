import express from "express";
import bodyparser from "body-parser";

const app = express();
const PORT = '3000';

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
});



app.listen(PORT, () => {
    console.log('Listenint on *:3000');
});