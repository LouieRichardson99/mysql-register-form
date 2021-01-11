const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users_db'
});

const static = express.static('public');

app.use('/', static);

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.connect((error) => {
        if (error) {
            console.error('Error connection:' + error.stack);
            return;
        }
        console.log('Connected as id:', connection.threadId);
    
        let q = `INSERT INTO users (username, pswd) VALUES (${username}, ${password})`;
    
        connection.query(q, (error, results) => {
            if (error.errno == 1062) {
                console.log('Username already taken');
            };
            console.log(results)
        });
    });
});

app.listen(port, () => {
    console.log('Server up and running on port:', port);
});

