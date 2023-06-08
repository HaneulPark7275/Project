const express = require('express');
const router = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');

app = express()
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(bodyParser.json());

const mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user:'web_project',
    password: '1234',
    database: 'my_db', 
});
db.connect();

router.post('/',(req,res,next)=>{
    console.log(req.body)
    const param = [req.body.email, req.body.id, req.body.password1, req.body.password2]
    if(req.body.password1 != req.body.password2){
        console.log('each password different');
        res.send("<script>alert('each password different');location.href='/join';</script>");
    }
    else{
        db.query('INSERT INTO Users(`email`,`id`,`password`) VALUES (?,?,?)', param, (err, row) =>{
            if(err) {
                console.log(err)
                res.send("<script>alert('use differnt username!');location.href='/';</script>");
            }
            else{
                res.send("<script>alert('sign in finish!');location.href='/';</script>");
            }
        })
    }
})

module.exports = router;