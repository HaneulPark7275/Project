const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const login = require('./routes/login')
const join = require('./routes/join')
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

app.use(express.static('client'));
app.use(express.static('public'));

app.use('/', login)
app.use('/join', join)

//app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/client/login.html');
//})

app.get('/home', (req, res) => {
    if(req.cookies.user){
        res.sendFile(__dirname + '/client/home.html');
    }
    else{
        res.send("<script>alert('Please Log-in!');location.href='/';</script>");
    }
});

app.get('/rule', (req, res) => {
    if(req.cookies.user){
        res.sendFile(__dirname + '/client/rule.html');
    }
    else{
        res.send("<script>alert('Please Log-in!');location.href='/';</script>");
    }});

app.get('/game', (req, res) => {
    if(req.cookies.user){
        res.sendFile(__dirname + '/client/game.html');
    }
    else{
        res.send("<script>alert('Please Log-in!');location.href='/';</script>");
    }});

app.get('/contact', (req, res) => {
    if(req.cookies.user){
        res.sendFile(__dirname + '/client/contact.html');
    }
    else{   
        res.send("<script>alert('Please Log-in!');location.href='/';</script>");
    }});

app.post('/home',(req,res) => {
    console.log("log out!");
    res.clearCookie('user');    
    res.redirect('/');
})
app.post('/rule',(req,res) => {
    console.log("log out!");
    res.clearCookie('user');    
    res.redirect('/');
})
app.post('/game',(req,res) => {
    console.log("log out!");
    res.clearCookie('user');    
    res.redirect('/');
})
app.post('/contact',(req,res) => {
    console.log("log out!");
    res.clearCookie('user');    
    res.redirect('/');
})
app.post('/home',(req,res) => {
    console.log("log out!");
    res.clearCookie('user');    
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})