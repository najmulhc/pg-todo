const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      `INSERT  INTO todos (name) VALUES ('${name}'); 
      SELECT * FROM todos
      `
    );

    res.json({
      todos: result[1].rows,
    });
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/", async (req, res) => {
  const { id } = req.query;
  if (id) {
    const result = await pool.query(`SELECT * FROM todos WHERE id=${id}`);
    res.json({
      todo: result.rows[0],
    });
  } else {
    const result = await pool.query("SELECT * FROM todos;");
    const todos = result.rows;
    res.json({
      todos,
    });
  }
});

app.put("/", async (req, res) => {
  try {
    const { id } = req.query;
    const { name } = req.body;
    const results =
      await pool.query(`UPDATE todos SET name='${name}' WHERE id=${id}; 
  SELECT * FROM todos;`);
    res.json({
      todos: results[1].rows,
    });
  } catch (error) {
    res.json(error.message);
  }
});

app.delete("/", async (req, res) => {
  try {
    const { id } = req.query;

    const result = await pool.query(
      `DELETE FROM todos WHERE id=${parseInt(id)}; SELECT * FROM todos;`
    );
    const output = await pool.query("");
    res.json({
      todos: result[1].rows,
    });
  } catch (error) {
    res.json(error.message);
  }
});

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`The express app is running in the port ${port}`);
});
