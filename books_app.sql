CREATE TABLE IF NOT EXISTS books(
  id SERIAL PRIMARY KEY,
  author VARCHAR(250),
  title VARCHAR(250),
  isbn VARCHAR(250),
  image_url VARCHAR(250), 
  description TEXT,

);