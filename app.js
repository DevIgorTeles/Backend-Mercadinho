const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/market");
require("dotenv").config();
const app = express();
const ProductsRouter = require("./src/Routers/ProductsRouter");
const userRouter = require('./src/Routers/UserRouter')
const MiddlewareAuth = require("./MiddlewareAuth");
const cors = require('cors')


app.use(express.json());
app.use(cors())
app.use(ProductsRouter);
app.use(MiddlewareAuth);
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `Sua aplicação está sendo executado na porta ${process.env.PORT}`
    
  );
});
