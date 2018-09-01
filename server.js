'use strict'
//dependencies
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const app = express();
// const superagent = require('superagent');

//server set up
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);

//database connect
client.connect();
client.on('error', err => console.error(err));

//view engine connect
app.set('view engine', 'ejs');

//set as static
app.use(express.static('./public'));

//API



//queries
app.get('/books', (request, response) => {
  client.query(`
      SELECT title, author, image_url, id
      FROM books
    `)
    .then(result => {
      response.render('index.ejs', { books: result.rows });
    })
});

app.get('/books/:id', (request, response) => {
  const sql = `SELECT * FROM books WHERE id=($1)`;
  const values = [request.params.id];
  client.query(sql, values)
    .then (results => {
      response.render ('pages/show.ejs', {books: results.rows})
    })
    .catch (err => console.log(err, response));
});

// const url = 'https://www.googleapis.com/books/v1/volumes';
// app.get('/super', (request, response) => {
//   response.send(superagent.get(http: examplesiteinformarion)
//   .then(results => {
//     response.send(results.body)
//   }));
// });

app.get('views/pages/new', (request, response) => {
  response.render('/new');
})


app.post('/books',(request, response) => {
  let {author, title, isbn, image_url, description} = request.body;
  let sql = `INSERT INTO books (author, title, isbn, image_url, description) VALUES ($1, $2, $3, $4, $5);`;
  let VALUES = [author, title, isbn, image_url, description];
  return client.query(sql, VALUES)
    .then(() => {
      sql = `SELECT * FROM books WHERE isbn=$1;`;
      VALUES =[request.body.isbn];
      return client.query (sql, VALUES)
        .then(result => response.render('pages/show', {books : result.rows[0], message: 'Thank you for adding to my collection'}))
    })
  
})

app.get('*', (request, response) => {
  response.render('pages/error');
})

//listener
app.listen(PORT, () => console.log(`Listening on PORT`,PORT));

