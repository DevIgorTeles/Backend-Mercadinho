const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/market");
require("dotenv").config();
const app = express();
const ProductsRouter = require("./src/Routers/ProductsRouter");
const userRouter = require('./src/Routers/UserRouter');
const MiddlewareAuth = require("./MiddlewareAuth");
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Aplicar o middleware de autenticação
app.use(MiddlewareAuth);

// Rotas
app.use(ProductsRouter);
app.use(userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sua aplicação está sendo executada na porta ${PORT}`);
});
