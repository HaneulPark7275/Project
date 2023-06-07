const express = require('express');
const router = require('express').Router();
const path = require('path');
const cookieParser = require('cookie-parser')
const join = require('./join');

app = express()
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.use('/join', join);

const mysql = require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user:'web_project',
    password: '1234',
    database: 'my_db', 
});
db.connect();

//111111
router.get('/', function(req, res, next) {
    console.log(req.cookies.user)
    if(req.cookies.user){
        res.send("<script>alert('Already Log-in!');location.href='/home';</script>");
    }
    else{
        console.log('not login');
        res.sendFile(path.join(__dirname, '../client/login.html'));
    }
});
//111111111111

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
            if(param[1] == row[0].password){
                console.log('Login Success')
                res.cookie("user", row[0].id , {
                    expires: new Date(Date.now() + 900000),
                    secure: false
                });
                res.redirect("/home");
            }
            else{
                console.log('Wrong Password')
                res.send("<script>alert('wrong ID or password!');location.href='/';</script>");
            }
        }else{
            console.log('ID does not exist')
            res.send("<script>alert('wrong ID or password!');location.href='/';</script>");
        }
    })
}
)

module.exports = router;