const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const vitamins = require('./vitamins.js');
const minerals = require('./minerals.js');

function ageRange(years){
	let range = '';

	if(years > 70){
		range = '70';
	}else if(years > 50){
		range = '51-70';
	}else if(years > 30){
		range = '31-50';
	}else if(years > 18){
		range = '19-30';
	}else if(years > 13){
		range = '14-18';
	}else if(years > 8){
		range = '9-13';
	}else{
		range = '4-8';
	}

	return range;
}

app.get('/', (req, res) => {
	res.json(
		{
			"minerals": minerals,
			"vitamins": vitamins
		}
	);
});

app.get('/minerals', (req, res) => {
	res.json(minerals);
});

app.get('/minerals/:age', (req, res) => {
	res.json(minerals['4-8']);
});

app.get('/minerals/:age/:gender', (req, res) => {
	let range = ageRange(+req.params.age);

	if(+req.params.age > 8){
		res.json(minerals[range][req.params.gender]);
	}else{
		res.json(minerals[range]);
	}
});

app.get('/minerals/:age/:gender/:mineral', (req, res) => {
	let range = ageRange(+req.params.age);

	if(+req.params.age > 8){
		res.json(minerals[range][req.params.gender][req.params.mineral]);
	}else{
		res.json(minerals[range][req.params.mineral]);
	}	
});

app.get('/vitamins', (req, res) => {
	res.json(vitamins);
});

app.get('/vitamins/:age', (req, res) => {
	res.json(vitamins['4-8']);
});

app.get('/vitamins/:age/:gender', (req, res) => {
	let range = ageRange(+req.params.age);

	if(+req.params.age > 8){
		res.json(vitamins[range][req.params.gender]);
	}else{
		res.json(vitamins[range]);
	}
});

app.get('/vitamins/:age/:gender/:vitamin', (req, res) => {
	let range = ageRange(+req.params.age);

	if(+req.params.age > 8){
		res.json(vitamins[range][req.params.gender][req.params.vitamin]);
	}else{
		res.json(vitamins[range][req.params.vitamin]);
	}	
});

app.listen(port, () => {
	console.log(`API listening on port ${port}`);
});
