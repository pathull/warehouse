require("dotenv").config();
const express = require("express")
const morgan = require("morgan")

const app = express()

//Middleware
app.use(morgan("tiny"));
app.use(express.json())



const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`server running and listening on port ${port}`)
});