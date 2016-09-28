const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	res.status(404)
   		.send('Not found');
});

app.get('/hello', (req, res) => {
	res.send('Hello Team');
});



app.listen(port);
console.log('Server is up');