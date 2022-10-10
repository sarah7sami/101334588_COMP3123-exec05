const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
var path = require('path');
const fs = require('fs');

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/

router.get('/user', function(req, res) {
    fs.readFile(__dirname + '/user.json', 'utf8', function(err, data) {
        res.end(data);
    });
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/

router.get('/login', function(req, res) {
    fs.readFile(__dirname + '/user.json', 'utf8', function(err, data) {
        var user = JSON.parse(data);
        if (user.username == req.query.username && user.password == req.query.password) {
            res.end(JSON.stringify({
                status: true,
                message: "User Is valid"
            }));
        } else if (user.username != req.query.username) {
            res.end(JSON.stringify({
                status: false,
                message: "User Name is invalid"
            }));
        } else if (user.password != req.query.password) {
            res.end(JSON.stringify({
                status: false,
                message: "Password is invalid"
            }));
        }
    });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/

router.get('/logout/:username', function(req, res) {
    res.end(`<b>${req.params.username} successfully logout.<b>`);
});

app.use('/', router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

