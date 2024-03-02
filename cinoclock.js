const express = require('express');
const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

const dogs = require('./data/dogs');

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home.ejs');
});

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
