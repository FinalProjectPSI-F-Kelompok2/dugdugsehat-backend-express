// import app from './src/routes/routes.js';
const app = require('./src/routes/routes.js')
const dotenv = require('dotenv');

const port = process.env.PORT || 3000;

// Load Dotenv
dotenv.config();

app.listen(port, () => {
  console.log(`running on port ${port}`);
})