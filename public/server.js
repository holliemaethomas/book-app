'use strict'

require('dotenv').config();

// Application Dependencies
const express = require('express');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Serve static files
app.use(express.static('public'));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

app.get('/ping', (request, response) => {
  response.send('pong');
});

app.get('/hello', (request, response) => {
  response.render('pages/hello.ejs');
});

app.get('/books', (request, response) => {
  client.query(`
      SELECT title, author, image_url
      FROM books
    `)
    .then(result => {
      response.render('index', { books: result.rows });
    })
});

app.get('*', (request, response) => {
  response.render('pages/error');
})

app.listen(PORT, () => console.log('Listening on PORT', PORT));