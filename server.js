const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Root',
    database: 'studentdb'
});

// Connect Database
db.connect((err) => {
    if(err){
        console.log("Database Connection Failed");
    } else {
        console.log("Database Connected");
    }
});

// Serve HTML File
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Insert Data
app.post('/submit', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const Subject = req.body.Subject
    const Message = req.body.Message;

    const sql = "INSERT INTO students (name, email, Subject, Message) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, Subject, Message], (err, result) => {

        if(err){
            console.log(err);
            res.send("Error");
        } else {
            res.send("Data Inserted Successfully");
        }

    });

});

app.listen(33060, () => {
    console.log("Server Running on Port 33060");
});