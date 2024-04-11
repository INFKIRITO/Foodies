const express = require('express');
const app = express();

const connectDB = require('./db');
connectDB();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));

app.listen(5000, () => {
  console.log('app listening on port 5000');
});
