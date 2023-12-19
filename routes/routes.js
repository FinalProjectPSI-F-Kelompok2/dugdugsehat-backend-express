const express = require('express');

// Middleware imports
const log = require('../middleware/logger');

// Controller imports
const { login, register } = require('../controllers/profile');
const authenticate = require('../middleware/authenticate');
const { getHistory, saveHistory } = require('../controllers/health');

function ping(_, res) {
  res.send('Pong');
}

const app = express()

app.use(log);
app.use(express.json());

// Ping
app.get('/ping', ping);

// Credential Login & Register
app.post('/login', login);
app.post('/register', register);

// Health Data
app.get('/health', authenticate, getHistory);
app.post('/health', authenticate, saveHistory);

module.exports = app;