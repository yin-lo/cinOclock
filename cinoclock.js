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

app.get('/dogs', (req,res) => {
	res.render('dogs.ejs',{dogs})
});

app.get('/dogs/:dogUrl', (req,res) => {
	const dog = dogs.find((dogy) => dogy.url === req.params.dogUrl);
	res.render('details.ejs',{dog});
})


app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
