import express, { response } from "express";
import mysql from 'mysql'

import cors from 'cors'
import bodyParser from "body-parser";

const app = express();
app.use(cors())



let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_table',
    multipleStatements: true
})

mysqlConnection.connect((err) => {
    if (!err)
        console.log('connected')
    else
        console.log(err)
})


app.get('/', (req, res) => {
    mysqlConnection.query("select concat_ws(first_name, last_name) as Name from client c join works_with w on c.client_id = w.client_id join employee e on e.emp_id =  w.emp_id where sex='m' AND client_name='fedex' or client_name='Lackawana Country' ", (err, rows, fields) => {
        if (!err)
            res.json(rows)
        else {
            console.log(err)
            res.send("There was a problem")
        }
    })
})

app.get('/user', (req, res) => {
    mysqlConnection.query('Select * from works_with', (err, rows, fields) => {
        res.json(rows)
    })
})


app.listen(8000, () => console.log('server running on localhost: 8000'))