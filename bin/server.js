const mongoose = require('mongoose');
const app = require('../app');
require('colors');

const { DB_HOST, PORT = 3001 } = process.env;
mongoose.set('strictQuery', false);

mongoose
  .connect(DB_HOST)
  .then(app.listen(PORT, console.log('Database connection successful:', `http://localhost:${PORT}/api/`.blue)))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
