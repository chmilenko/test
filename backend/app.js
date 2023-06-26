require('dotenv').config();

const express = require('express');
const config = require('./config/config');
const testDbConnection = require('./db/testDbConnection');

const app = express();
const PORT = process.env.PORT ?? 3000;

config(app);

app.use((error, req, res, _next) => {
  console.error('Произошла ошибка', error);
  res.status(500).json({
    success: false,
    message: 'Непредвиденная ошибка сервера, попробуйте зайти позже',
  });
});

// порт
app
  .listen(PORT, () => {
    console.log(`сервер запущен на порту ${PORT}`);
    testDbConnection();
  })
  .on('error', (error) => {
    console.log('Ошибка веб-сервера');
    console.log(error.message);
  });
