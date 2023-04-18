const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(express.static('public'));

app.listen(port, () => {
    console.log('서버가 실행됩니다. http://localhost:${port}');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "home.html");
});

app.get('/Group 7', (req, res) => {
    res.sendFile(__dirname + "home.html");
});

app.get('/Home', (req, res) => {
    res.sendFile(__dirname + "home.html");
});

app.get('/Rule', (req, res) => {
    res.sendFile(__dirname + "rule.html");
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "rule.html");
});