const express = require('express')
const app = express()
const login = require('./routes/login')
const join = require('./routes/join')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(express.static('client'));
app.use(express.static('public'));

app.use('/', login)
app.use('/join', join)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/login.html');
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/client/home.html');
});

app.get('/rule', (req, res) => {
  res.sendFile(__dirname + '/client/rule.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/client/game.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/client/contact.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})