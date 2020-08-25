const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static(path.resolve(__dirname, './css')));
app.use('/js', express.static(path.resolve(__dirname, './js')));
app.use('/images', express.static(path.resolve(__dirname, './images')));
app.use('/fonts', express.static(path.resolve(__dirname, './fonts')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.use('*', (req, res) => {
  res.status(404).send('404: Whoops, Not Found');
});

// global error handeler
app.use((err, req, res, next) => {
  res.status(500).send('500: There was a global error', err);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
