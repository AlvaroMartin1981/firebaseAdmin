require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const routes = require('./routes/routes') 



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/', routes);


app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});