'use strict'

require('dotenv').config();


const express = require('express');
const pg = require('pg');
const app = express();

const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);



client.connect();
client.on('error', err => console.error(err));

app.set('view engine', 'ejs');

app.use(express.static('./public'));


app.get('/books', (request, response) => {
  client.query(`
      SELECT title, author, image_url
      FROM books
    `)
    .then(result => {
      response.render('index.ejs', { books: result.rows });
    })
});

app.get('*', (request, response) => {
  response.render('pages/error');
})

app.listen(PORT, () => console.log(`Listening on PORT`,PORT));
