const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

// create a todo

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
    console.log(req.body);
    return res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// get all

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err);
  }
});

// get one
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(todo.rows);
  } catch (err) {
    console.log(err);
  }
});

// edit
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query('UPDATE todo SET description = $1 where todo_id = $2', [description, id]);
    res.json('Todo was updated!');
  } catch (err) {
    console.log(err);
  }
});

// delete
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo where todo_id = $1 ', [id]);
    res.json('Todo was deleted!');
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
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
