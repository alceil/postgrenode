const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json);

app.post('/todos', (req,res)=>{
    try {

        console.log(req.body);
        // const {description} = req.body;
        // const newTodo = await pool.query(
        //     "INSERT  INTO todo (description) VALUES($l) RETURNING *",
        //     [description]
        //     );
        //     res.json(newTodo.rows[0]);        
    } catch (error) {
        console.error(error.message);   
    }
});


app.get('/todos',async (req,res)=>{
    try {
        // const {description} = req.body;
        const AllTodos = await pool.query(
            "SELECT * FROM todos",
        
            );
            res.json(AllTodos.rows);        
    } catch (error) {
        console.error(error.message);   
    }
});

app.get('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const todos = await pool.query(
            "SELECT * FROM todos WHERE todo_id = $1",
            [id]
            );
            res.json(AllTodos.rows);        
    } catch (error) {
        console.error(error.message);   
    }
});


app.put('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const todos = await pool.query(
            "UPDATE todos SET description = $1 WHERE todo_id=$2",
            [description,id]
            );
            res.json("Todo was updated");        
    } catch (error) {
        console.error(error.message);   
    }
});


app.delete('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const todos = await pool.query(
            "DELETE FROM todo WHERE todo_id=$1",
            [id]
            );
            res.json("Todo was updated");        
    } catch (error) {
        console.error(error.message);   
    }
});

app.listen('5000',()=>{
    console.log('Server app running on port 5000');

});

