const express = require('express');
const app = express();
const cors = require("cors");
const Pool = require('pg').Pool;
const expressFileUpload = require('express-fileupload');
const path = require('path');



// Instance of postgres (connecting to database)
const pool = new Pool (
    {
        user: "postgres",
        password: "superUser@Venu_26/12",
        host: "localhost",
        port: 5432,
        database: "employeeregistration",
    }
);

app.listen(4000, ()=>console.log('started server on port 4000...'))

// express middleware
app.use(express.json());
app.use(cors());

app.use(expressFileUpload());
const assetsFolder = path.join(__dirname,"assets");


// express api routes

// get all the values from the table in the database
app.get('/', async (req,res) => {
    try{
        const allValues = await pool.query(
            "SELECT * FROM employeedetails;"
        )
        res.json(allValues);

    } catch (err) {
        console.log(err.message);
    }
})

// create a registration
app.post('/', async (req,res) => {
    try {
        const {email,firstName,lastName,dateOfBirth,employeeId,phoneNo} = req.body;
        const newEmployee = await pool.query(
            'INSERT INTO employeedetails (firstname,lastname,dob,contactno,email,employeeid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [firstName,lastName,dateOfBirth,phoneNo,email,employeeId]
        )
        console.log("created new employee",newEmployee["rows"]);
    } catch (error) {
        console.log(error.message);
    }
})


// sample code for uploading files
app.get('/file', (req,res) => {
    res.status(202).json('This is a file upload testing page')
})

app.post('/file', (req,res) => {
    try{
        // console.log(req.body);
        console.log(req.files);
        res.status(200).json('uploaded');
        const {file} = req.files;
        file.mv(path.join(assetsFolder, file.name))

        

    }
    catch (error){
        console.log(error.message);
    }
})



