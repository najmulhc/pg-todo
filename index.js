const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());


app.get("/", async (req, res) => {
  pool.query("SELECT * FROM todos;", (error, results) => {
    if(error) {
        res.json({
            ...error
        })
    } else {
     const todos = results.rows;
     res.json({
        todos
     })
    }
  })
})


const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`The express app is running in the port ${port}`)
})