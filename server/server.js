const express = require('express')
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// This code compares two methods for getting to the public folder
// console.log(__dirname + '/../public');
// console.log(publicPath);

const port = 3000;

// instructor's solution for serving index.html
app.use(express.static(publicPath));

// my solution for serving index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(publicPath + '/index.html'));
// });

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
