const db = require('../models/model');

const dbController = {};

// const USER = 'defaultuser';
// const BOARD = 'defaultboard';

// Middleware function to add card
dbController.addCard = (req, res, next) => {
  // board_id, card_id

  if (req.body.board === undefined || req.body.body === undefined) {
    return next({
      log: 'Error in JSON body - missing properties',
      status: 400,
      message: 'Error adding card - missing properties',
    });
  }

  const query = 'INSERT INTO cards(board_id, status, body) VALUES ($1, 0, $2) RETURNING *';

  return db.query(query, [req.body.board, req.body.body])
    .then((result) => {
      console.log(result.rows[0]);
      [res.locals.result] = [result.rows[0]];
      return next();
    })
    .catch((err) => {
    //   console.log('err', err);
      next({
        log: `Error in dbController.addCard - ${err}`,
        status: 400,
        message: 'Error adding card',
      });
    });
};

// Middleware function to delete card
dbController.deleteCard = (req, res, next) => { 
  console.log(req.body.card);
  if (req.body.card === undefined || typeof req.body.card !== 'number') {
    // console.log('Body output', req.body, req);
    return next({
      log: 'Error in deleteCard - incorrect body request',
      status: 400,
      message: 'Error deleting card - invalid request',
    });
  }

  const query = 'DELETE FROM cards WHERE card_id = $1';

  return db.query(query, [req.body.card])
    .then(() => next())
    .catch((err) => {
      next({
        log: `Error in dbController.deleteCard - ${err}`,
        status: 400,
        message: 'Error deleting card',
      });
    });
};

dbController.updateCard = (req, res, next) => {
  // update function to return card
  if (req.body.card === undefined || typeof req.body.card !== 'number'
    || req.body.body === undefined
    || req.body.status === undefined || typeof req.body.status !== 'number') {
    // console.log('Body output', req.body);
    return next({
      log: 'Error in updateCard - incorrect body request',
      status: 400,
      message: 'Error updating card - invalid request',
    });
  }

  const query = 'UPDATE cards SET body = $1, status = $2 WHERE card_id = $3 RETURNING *';

  return db.query(query, [req.body.body, req.body.status, req.body.card])
    .then((response) => {
      [res.locals.cards] = [response.rows[0]];
      return next();
    })
    .catch((err) => {
      next({
        log: `Error in updateCard - invalid card update request: ${err}`,
        status: 400,
        message: 'Error updating card - invalid request',
      });
    });
};

dbController.resetBoard = (req, res, next) => {
  if (req.body.board === undefined) {
    return next({
      log: 'Error in resetBoard',
      status: 400,
      message: 'Error resetting board',
    });
  }

  const query = 'UPDATE cards SET status = 0 WHERE board_id = $1';

  return db.query(query, [req.body.board])
    .then(() => next())
    .catch((err) => {
      next({
        log: `Error in resetBoard - invalid card update request: ${err}`,
        status: 400,
        message: 'Error updating card - invalid request',
      });
    });
};

dbController.getBoard = (req, res, next) => {
  if (req.params === undefined) {
    return next({
      log: 'Error in getBoard',
      status: 400,
      message: 'Error retrieving board',
    });
  }
  const { id } = req.params;
  // console.log(id);
  const query = 'SELECT * FROM cards WHERE board_id = $1';
  return db.query(query, [id])
    .then((response) => {
      [res.locals.cards] = [response.rows];
      return next();
    })
    .catch((err) => {
      next({
        log: `Error in getBoard - invalid board retrieval request: ${err}`,
        status: 400,
        message: 'Error retrieving board - invalid request',
      });
    });
};

/**
 * AddCard - adds card to board
 * DeleteCard - deletes card from board
 * UpdateCard - updates card on board (status or body)
 * ResetBoard - updates all cards on board with status = 0
 * GetBoard - retrieves all cards on board
 * -----
 * CreateUser
 * VerifyCredentials
 * CreateBoard
 */

module.exports = dbController;
