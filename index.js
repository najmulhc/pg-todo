const express = require("express");
const cors = require("cors")

const app = express();

app.use(cors());


app.get("/", (req, res) => {
    res.json({
        message: "Huda is excited to use postgress!!!"
    })
})


const port = process.env.PORT || 5500;

app.listen(port, () => {
    console.log(`The express app is running in the port ${port}`)
})