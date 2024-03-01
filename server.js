// server.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'ваш_пользователь',
  host: 'localhost',
  database: 'ваша_бд',
  password: 'ваш_пароль',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM ваша_таблица');
    const data = result.rows;
    res.json(data);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});