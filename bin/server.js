const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const app = require('../app');
require('colors');

const { PORT = 3001 } = process.env; // DB_HOST
mongoose.set('strictQuery', false);

mongoose
  .connect(/* DB_HOST */ uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(app.listen(PORT, console.log('Database connection successful:', `http://localhost:${PORT}/api/`.blue)))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
