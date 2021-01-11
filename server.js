const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users_db'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connection: ' + error.stack);
        return;
    }
    console.log('Connected as id ', connection.threadId);

    let q = `INSERT INTO users (username, pswd) VALUES ('LouieR99', 'mypassword')`;

    connection.query(q, (error, results) => {
        if (error) throw error;
        console.log(results)
    })
});




app.get('/', (req, res) => {
    res.send('Test')
});

app.listen(port, () => {
    console.log('Server up and running on port ', port);
});

