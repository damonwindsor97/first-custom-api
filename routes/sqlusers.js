const express = require('express');
const router = express.Router();

const mysql = require('mysql')

function getConnection(){
    return mysql.createConnection({
         host     : 'localhost',
         user     : 'root',
         password : '',
         database : 'node_usersAPI',
         port: 3306
         });
}

router.get("/sqlusers", (req, res, next) => {
    const connection = getConnection()
    
    const queryString = "SELECT * FROM sqlusers";
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            res.send(`Seomthing is wrong ${err}`);
            next(new Error(`something is wrong ${err}`));
        }
        res.json(rows);
        });
    });
    
router.get('/sqlusers/:id', (req, res, next) => {

    const connection = getConnection()
    const userID = req.params.id;
    console.log(userID)
   
    const queryString = "SELECT * FROM sqlusers WHERE id=?";
    connection.query(queryString, [userID], (err, rows, fields) => {
        if(err){
            res.send(`something went wrong ${err}`);
            next(new Error(`something is wrong ${err}`))
        }
        const sqlusers = rows.map((fields) => {
            return {firstName: fields.first_name, lastName: fields.last_name};
        });
        res.json(sqlusers)
    });
})

router.post('/sqluser_create', (req, res, next) => {
    const connection = getConnection()
    const queryString = "INSERT INTO sqlusers (first_Name, last_Name) VALUES (?,?)"
    console.log(req.body)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    connection.query(queryString, [firstName, lastName], (err, results, fields) => {
        if(err){
            res.send(`Failed to insert new user: ${err}`);
            res.sendStatus(500);
            next(new Error(`Failed to insert new user: ${err}`))
        }

        res.send(`Inserted a new user with id: ${results.insertId}`);
    })

})

module.exports = router