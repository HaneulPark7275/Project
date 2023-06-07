const express = require('express');
const router = require('express').Router();
const path = require('path');
const join = require('./join');

app = express()
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/join', join);

const mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user:'web_project',
    password: '1234',
    database: 'my_db', 
});
db.connect();

router.get('/join',(req,res)=>{
    res.sendFile(path.join(__dirname, '../client/join.html'));
})

router.post('/',(req,res,next)=>{
    const param = [req.body.id, req.body.password]
    console.log(req.body)
    db.query('SELECT * FROM Users WHERE id=?', param[0],(err,row)=>{
        if(err)
            console.log(err)
        if(row.length > 0){
            //ID exist
            res.sendFile(path.join(__dirname, '../client/home.html'))
        }else{
            console.log('ID does not exist')
            res.send("<script>alert('wrong ID or password!');location.href='/';</script>");
        }
    })
}
)

module.exports = router;