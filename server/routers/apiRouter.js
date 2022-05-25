const express = require('express');

const dbController = require('../controllers/dbController');

const router = express.Router();

/**
 Get - all cards
 Post - create card
 Put - update card
 Put - reset board
 Delete - delete card
 */

router.post('/', dbController.addCard, (req, res) => {
  res.status(200).json(res.locals.result);
});

router.delete('/', dbController.deleteCard, (req, res) => {
  res.status(200).send();
});

router.put('/', dbController.updateCard, (req, res) => {
  res.status(200).send(res.locals.cards);
});

router.patch('/', dbController.resetBoard, dbController.getBoard, (req, res) => {
  res.status(200).json(res.locals.cards);
});

router.get('/:id', dbController.getBoard, (req, res) => {
  res.status(200).json(res.locals.cards);
});

module.exports = router;
