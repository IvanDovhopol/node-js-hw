const mongoose = require('mongoose');
const app = require('../app');
require('colors');

const { PORT = 3001, MONGODB_URI } = process.env;
mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URI)
  .then(app.listen(PORT, console.log('Database connection successful')))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
