//SERVER COMPONENT
//no login/registration form yet
//CRUD Operations for all tables
//pls confirm that it's working once connected to the client

const express = require('express');
const cors = require('cors')
const app = express();
const port = 3003;

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password1234!',
  database: 'outoften'
})
connection.connect();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//USER REQUESTS
// GET all users
app.get('/users', (req, res) => {
  let data = [];
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
      data.push({
        id: rows[i].id,
        firstname: rows[i].firstname,
        lastname: rows[i].lastname,
        email: rows[i].email,
        username: rows[i].username,
        bio: rows[i].bio,
        is_admin: rows[i].is_admin
      });
    }
    res.status(200).send(data);
  });
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  let id = req.params.id;
  connection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.status(404).send('User not found');
    } else {
      let data = {
        id: rows[0].id,
        firstname: rows[0].firstname,
        lastname: rows[0].lastname,
        email: rows[0].email,
        username: rows[0].username,
        bio: rows[0].bio,
        is_admin: rows[0].is_admin
      };
      res.status(200).send(data);
    }
  });
});

// PUT (update) user by ID
app.put('/users/:id', (req, res) => {
  let id = req.params.id;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let username = req.body.username;
  let bio = req.body.bio;
  let is_admin = req.body.is_admin;
  connection.query('UPDATE users SET firstname = ?, lastname = ?, email = ?, username = ?, bio = ?, is_admin = ? WHERE id = ?', [firstname, lastname, email, username, bio, is_admin, id], (err, result) => {
    if (err) throw err;
    res.status(200).send('User updated successfully');
  });
});

// POST (create) new user
app.post('/users', (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let username = req.body.username;
  let bio = req.body.bio;
  let is_admin = req.body.is_admin;
  let password = req.body.password;
  connection.query('INSERT INTO users (firstname, lastname, email, username, bio, is_admin, password) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, email, username, bio, is_admin, password], (err, result) => {
    if (err) throw err;
    res.status(201).send('User created successfully');
  });
});

//DELETE user by ID
app.delete('/users/:id', (req, res) => {
  let id = req.params.id;
  connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.status(200).send('User deleted successfully');
  });
});

//ALL REVIEWS REQUESTS
// GET all reviews
app.get('/reviews/', (req, res) => {
  let data = [];
  connection.query('SELECT * FROM review', (err, rows) => {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
      data.push({
        id: rows[i].id,
        book_id: rows[i].book_id,
        user_id: rows[i].user_id,
        genre_id: rows[i].genre_id,
        author_id: rows[i].author_id,
        summary: rows[i].summary,
        review_content: rows[i].review_content,
        vote_id: rows[i].vote_id,
        date: rows[i].date,
        resource_link: rows[i].resource_link
      });
    }
    res.status(200).send(data);
  });
});

// GET review by ID
app.get('/reviews/:id', (req, res) => {
  let id = req.params.id;
  let data = [];
  connection.query('SELECT * FROM review WHERE id = ?', [id], (err, rows) => {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
      data.push({
        id: rows[i].id,
        book_id: rows[i].book_id,
        user_id: rows[i].user_id,
        genre_id: rows[i].genre_id,
        author_id: rows[i].author_id,
        summary: rows[i].summary,
        review_content: rows[i].review_content,
        vote_id: rows[i].vote_id,
        date: rows[i].date,
        resource_link: rows[i].resource_link
      });
    }
    res.status(200).send(data);
  });
});

// POST a new review
app.post('/reviews/', (req, res) => {
  let data = req.body;
  let query = 'INSERT INTO review (book_id, user_id, genre_id, author_id, summary, review_content, vote_id, date, resource_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  let values = [data.book_id, data.user_id, data.genre_id, data.author_id, data.summary, data.review_content, data.vote_id, data.date, data.resource_link];
  connection.query(query, values, (err, rows) => {
    if (err) throw err;
    res.status(201).send('Review added successfully!');
  });
});

// PUT (update) an existing review
app.put('/reviews/:id', (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let query = 'UPDATE review SET book_id=?, user_id=?, genre_id=?, author_id=?, summary=?, review_content=?, vote_id=?, date=?, resource_link=? WHERE id=?';
  let values = [data.book_id, data.user_id, data.genre_id, data.author_id, data.summary, data.review_content, data.vote_id, data.date, data.resource_link, id];
  connection.query(query, values, (err, rows) => {
    if (err) throw err;
    res.status(200).send('Review updated successfully!');
  });
});

// delete a review by id
app.delete('/reviews/:id', (req, res) => {
  const reviewId = req.params.id;
  connection.query('DELETE FROM review WHERE id = ?', [reviewId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send(`Review with id ${reviewId} not found`);
    }
    res.status(204).send();
  });
});

//ALL TOKEN REQUESTS
// get all tokens
app.get('/tokens', (req, res) => {
  connection.query('SELECT * FROM token', (err, rows) => {
    if (err) throw err;
    res.status(200).send(rows);
  });
});

// get token by value
app.get('/tokens/:value', (req, res) => {
  const tokenValue = req.params.value;
  connection.query('SELECT * FROM token WHERE token = ?', [tokenValue], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      return res.status(404).send(`Token with value ${tokenValue} not found`);
    }
    res.status(200).send(rows[0]);
  });
});

// create a new token
app.post('/tokens', (req, res) => {
  const token = req.body.token;
  const validTo = req.body.validTo;
  connection.query('INSERT INTO token (token, valid_to) VALUES (?, ?)', [token, validTo], (err, result) => {
    if (err) throw err;
    res.status(201).send({ id: result.insertId });
  });
});

// update an existing token
app.put('/tokens/:value', (req, res) => {
  const tokenValue = req.params.value;
  const newValidTo = req.body.validTo;
  connection.query('UPDATE token SET valid_to = ? WHERE token = ?', [newValidTo, tokenValue], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send(`Token with value ${tokenValue} not found`);
    }
    res.status(204).send();
  });
});

// delete a token by value
app.delete('/tokens/:value', (req, res) => {
  const tokenValue = req.params.value;
  connection.query('DELETE FROM token WHERE token = ?', [tokenValue], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send(`Token with value ${tokenValue} not found`);
    }
    res.status(204).send();
  });
});

//ALL AUTHOR REQUESTS
app.get('/authors', (req, res) => {
  let data = [];
  connection.query('SELECT * FROM author', (err, rows) => {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++)
      data.push({
        id: rows[i].id,
        name: rows[i].name
      });
    res.status(200).send(data);
  })
})

app.get('/authors/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM author WHERE id = ${id}`, (err, rows) => {
    if (err) throw err;
    const data = {
      id: rows[0].id,
      name: rows[0].name
    };
    res.status(200).send(data);
  })
})

app.post('/authors', (req, res) => {
  const { name } = req.body;
  connection.query(`INSERT INTO author (name) VALUES ('${name}')`, (err, result) => {
    if (err) throw err;
    res.status(201).send(`Author ${name} created with id ${result.insertId}`);
  })
})

app.put('/authors/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  connection.query(`UPDATE author SET name = '${name}' WHERE id = ${id}`, (err) => {
    if (err) throw err;
    res.status(200).send(`Author ${id} updated with name ${name}`);
  })
})

app.delete('/authors/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE FROM author WHERE id = ${id}`, (err) => {
    if (err) throw err;
    res.status(200).send(`Author ${id} deleted`);
  })
})

//ALL review_comment REQUESTS
app.get('/comments', (req, res) => {
  let data = [];
  connection.query('SELECT * FROM review_comments', (err, rows) => {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++)
      data.push({
        id: rows[i].id,
        review_id: rows[i].review_id,
        comment_id: rows[i].comment_id,
      });
    res.status(200).send(data);
  });
});
app.get('/comments/:id', (req, res) => {
  connection.query(
    `SELECT * FROM review_comments WHERE id=${req.params.id}`,
    (err, rows) => {
      if (err) throw err;
      if (rows.length === 0)
        res.status(404).send('Comment not found');
      else
        res.status(200).send({
          id: rows[0].id,
          review_id: rows[0].review_id,
          comment_id: rows[0].comment_id,
        });
    }
  );
});
app.post('/comments', (req, res) => {
  const { review_id, comment_id } = req.body;
  if (!review_id || !comment_id)
    res.status(400).send('Missing required fields');
  else {
    connection.query(
      `INSERT INTO review_comments (review_id, comment_id) VALUES (${review_id}, ${comment_id})`,
      (err, result) => {
        if (err) throw err;
        res.status(201).send(`Comment created with ID: ${result.insertId}`);
      }
    );
  }
});
app.put('/comments/:id', (req, res) => {
  const { review_id, comment_id } = req.body;
  if (!review_id || !comment_id)
    res.status(400).send('Missing required fields');
  else {
    connection.query(
      `UPDATE review_comments SET review_id=${review_id}, comment_id=${comment_id} WHERE id=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0)
          res.status(404).send('Comment not found');
        else
          res.status(200).send(`Comment updated with ID: ${req.params.id}`);
      }
    );
  }
});
app.delete('/comments/:id', (req, res) => {
  connection.query(
    `DELETE FROM review_comments WHERE id=${req.params.id}`,
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows === 0)
        res.status(404).send('Comment not found');
      else
        res.status(200).send(`Comment deleted with ID: ${req.params.id}`);
    }
  );
});

//ALL BOOK REQUESTS
app.get('/books', (req, res) => {
  let data = [];
  connection.query('SELECT * FROM book', (err, rows) => {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
      data.push({
        id: rows[i].id,
        title: rows[i].title,
        author_id: rows[i].author_id,
        published_date: rows[i].published_date,
        genre_id: rows[i].genre_id,
        rating: rows[i].rating
      });
    }
    res.status(200).send(data);
  })
})
app.get('/books/:id', (req, res) => {
  let bookId = req.params.id;
  let data = {};
  connection.query(`SELECT * FROM book WHERE id = ${bookId}`, (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.status(404).send('Book not found');
    } else {
      data = {
        id: rows[0].id,
        title: rows[0].title,
        author_id: rows[0].author_id,
        published_date: rows[0].published_date,
        genre_id: rows[0].genre_id,
        rating: rows[0].rating
      };
      res.status(200).send(data);
    }
  })
})
app.post('/books', (req, res) => {
  let newBook = {
    title: req.body.title,
    author_id: req.body.author_id,
    published_date: req.body.published_date,
    genre_id: req.body.genre_id,
    rating: req.body.rating
  };
  connection.query('INSERT INTO book SET ?', newBook, (err, result) => {
    if (err) throw err;
    newBook.id = result.insertId;
    res.status(201).send(newBook);
  });
});
app.put('/books/:id', (req, res) => {
  let bookId = req.params.id;
  let updatedBook = {
    title: req.body.title,
    author_id: req.body.author_id,
    published_date: req.body.published_date,
    genre_id: req.body.genre_id,
    rating: req.body.rating
  };
  connection.query(`UPDATE book SET ? WHERE id = ${bookId}`, updatedBook, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).send('Book not found');
    } else {
      updatedBook.id = bookId;
      res.status(200).send(updatedBook);
    }
  });
});
app.delete('/books/:id', (req, res) => {
  let bookId = req.params.id;
  connection.query(`DELETE FROM book WHERE id = ${bookId}`, (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).send('Book not found');
    } else {
      res.status(204).send();
    }
  });
});

//ALL VOTE REQUESTS
app.get('/votes', (req, res) => {
  let data = [];
  connection.query('SELECT * FROM vote', (err, rows) =>{
    if(err) throw err;
    for (let i = 0; i < rows.length; i++)
      data.push({
        id: rows[i].id,
        rating: rows[i].rating,
        book_title: rows[i].book_title,
      });
    res.status(200).send(data);
  })
})
app.get('/votes/:id', (req, res) => {
  const voteId = req.params.id;
  connection.query('SELECT * FROM vote WHERE id = ?', [voteId], (err, rows) =>{
    if(err) throw err;
    const vote = rows[0];
    const data = {
      id: vote.id,
      rating: vote.rating,
      book_title: vote.book_title,
    };
    res.status(200).send(data);
  })
})
app.post('/votes', (req, res) => {
  const { rating, book_title } = req.body;
  connection.query('INSERT INTO vote (rating, book_title) VALUES (?, ?)', [rating, book_title], (err, result) =>{
    if(err) throw err;
    const newVoteId = result.insertId;
    const data = {
      id: newVoteId,
      rating,
      book_title,
    };
    res.status(201).send(data);
  })
})
app.put('/votes/:id', (req, res) => {
  const voteId = req.params.id;
  const { rating, book_title } = req.body;
  connection.query('UPDATE vote SET rating = ?, book_title = ? WHERE id = ?', [rating, book_title, voteId], (err, result) =>{
    if(err) throw err;
    const data = {
      id: voteId,
      rating,
      book_title,
    };
    res.status(200).send(data);
  })
})
app.delete('/votes/:id', (req, res) => {
  const voteId = req.params.id;
  connection.query('DELETE FROM vote WHERE id = ?', [voteId], (err, result) =>{
    if(err) throw err;
    res.sendStatus(204);
  })
})

//ALL COMMENT REQUESTS
app.get('/comments', (req, res) => {
  let data = [];
  connection.query('SELECT * FROM comment', (err, rows) => {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
      data.push({
        id: rows[i].id,
        userId: rows[i].user_id,
        reviewId: rows[i].review_id,
        content: rows[i].content,
        date: rows[i].date,
      });
    }
    res.status(200).send(data);
  });
});

app.get('/comments/:id', (req, res) => {
  let data = [];
  connection.query(
    'SELECT * FROM comment WHERE id = ?',
    [req.params.id],
    (err, rows) => {
      if (err) throw err;
      for (let i = 0; i < rows.length; i++) {
        data.push({
          id: rows[i].id,
          userId: rows[i].user_id,
          reviewId: rows[i].review_id,
          content: rows[i].content,
          date: rows[i].date,
        });
      }
      res.status(200).send(data);
    }
  );
});
app.put('/comments/:id', (req, res) => {
  connection.query(
    'UPDATE comment SET user_id = ?, review_id = ?, content = ?, date = ? WHERE id = ?',
    [req.body.userId, req.body.reviewId, req.body.content, req.body.date, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.status(200).send(`Comment with ID ${req.params.id} has been updated.`);
    }
  );
});
app.post('/comments', (req, res) => {
  connection.query(
    'INSERT INTO comment (user_id, review_id, content, date) VALUES (?, ?, ?, ?)',
    [req.body.userId, req.body.reviewId, req.body.content, req.body.date],
    (err, result) => {
      if (err) throw err;
      res.status(201).send(`Comment with ID ${result.insertId} has been created.`);
    }
  );
});
app.delete('/comments/:id', (req, res) => {
  connection.query(
    'DELETE FROM comment WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      res.status(200).send(`Comment with ID ${req.params.id} has been deleted.`);
    }
  );
});

//ALL GENRE REQUESTS
app.get('/genres', (req, res) => {
  let data = [];
  connection.query('SELECT * FROM genre', (err, rows) => {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
      data.push({
        id: rows[i].id,
        genre: rows[i].genre,
      });
    }
    res.status(200).send(data);
  });
});

app.get('/genres/:id', (req, res) => {
  const genreId = req.params.id;
  connection.query('SELECT * FROM genre WHERE id = ?', [genreId], (err, rows) => {
    if (err) throw err;
    if (rows.length === 0) {
      res.status(404).send("Genre not found");
    } else {
      const data = {
        id: rows[0].id,
        genre: rows[0].genre,
      };
      res.status(200).send(data);
    }
  });
});
app.post('/genres', (req, res) => {
  const genreName = req.body.genre;
  connection.query('INSERT INTO genre (genre) VALUES (?)', [genreName], (err, result) => {
    if (err) throw err;
    const data = {
      id: result.insertId,
      genre: genreName,
    };
    res.status(201).send(data);
  });
});
app.put('/genres/:id', (req, res) => {
  const genreId = req.params.id;
  const genreName = req.body.genre;
  connection.query('UPDATE genre SET genre = ? WHERE id = ?', [genreName, genreId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).send("Genre not found");
    } else {
      const data = {
        id: genreId,
        genre: genreName,
      };
      res.status(200).send(data);
    }
  });
});
app.delete('/genres/:id', (req, res) => {
  const genreId = req.params.id;
  connection.query('DELETE FROM genre WHERE id = ?', [genreId], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      res.status(404).send("Genre not found");
    } else {
      res.status(204).send();
    }
  });
});
