const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

// create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1)",
      [description]
    );
    console.log(req.body);
    return res.json(newTodo);
  } catch (err) {
    console.log(err);
  }
});

// get all

// get one

// edit

// delete

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

/* 
Postgress setup scripts:
install:  sudo apt install postgresql postgresql-contrib
confirm installation : psql --version
start, status, stop : sudo service postgresql start
open shell : sudo -u postgres psql


List users: \du
Create user: CREATE USER superuser WITH SUPERUSER PASSWORD 'superuser';
*/
