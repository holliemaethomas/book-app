'use strict';
require('dotenv').config();

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT;
const app = express();

const conString = 'postgres://localhost:5432/books_app';
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', error => {
  console.error(error);
});

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
app.get('/hello'), (request, response) => {
  response.render('index');
}

app.get('books', (request, response) =>{
response.send('client.query('SELECT DataTransferItemList, author, image_url FROM books;')
.then(results => {response.send(results.rows);
  response.render('index');
});
});