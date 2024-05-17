require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const routerUser = require('./routes/userRoutes')
const routerProducts= require('./routes/productRoutes')
const routerAxios = require('./routes/axiosRoutes') 



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/axios', routerAxios);
app.use('/', routerProducts);
app.use('/users', routerUser);


app.listen(port, () => {
  console.log(`El servidor está escuchando en http://localhost:${port}`);
});