require('dotenv').config();

const path = require('path');
const express = require('express');

const app = express();

const PORT = 3000;

// require routers
const apiRouter = require('./routers/apiRouter');

// Global JSON parser
app.use(express.json());

// Serve static files
app.use(express.static(path.resolve(__dirname, '../dist')));

// Entry point for index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

// Routers
app.use('/api', apiRouter);

// Global event handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defErr = {
    log: `Unknown error caught: ${err}`,
    status: 400,
    message: { err: 'Unknown error occured' },
  };

  const errObj = { ...defErr, ...err };

  console.error(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log('Listening on port:', PORT));
