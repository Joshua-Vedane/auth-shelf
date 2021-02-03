const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const sqlText = `SELECT * FROM "item";`;

    pool
      .query(sqlText)
      .then((result) => res.send(result.rows))
      .catch((err) => {
        console.log(`error in GET with query ${sqlText}`, err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req.body);

  const queryText = `
    INSERT INTO "item" ("description", "image_url", "user_id")
    VALUES ($1, $2, $3);
  `;

  pool
    .query(queryText, [req.body.description, req.body.image, req.user.id])
    .then(() => {
      console.log('Item added to shelf');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  if (req.isAuthenticated()) {
    const sqlText = `
      DELETE FROM "item" WHERE "id" = $1 AND "user_id" = $2;
    `;

    pool
      .query(sqlText, [req.params.id, req.user.id])
      .then(() => res.sendStatus(204))
      .catch((error) => {
        console.error('error in delete', error);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
