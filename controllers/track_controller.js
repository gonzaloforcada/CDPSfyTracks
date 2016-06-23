var fs = require('fs');
var path = require('path');
var request = require('request');

//GET: para buscar una cancion

exports.buscaCancion = function (req, res) {
	var nombre = req.params.name;
	var nombreString = nombre.toString();
	res.sendFile(nombreString,{root: '/mnt/nas'});
};

//POST: para guardar canciones en tracks

exports.guardaCancion = function (req, res) {
	var urlNas = "/mnt/nas/";
	var nombreAudio = '';
	var url = '';
	var audio;
	var nombre = '';
	var body = '';
	var i = 0;

	req.on('data', function(data) {
		if(i==0){
			var rd = Math.floor((Math.random()*100)+1);
			nombre = new Date().getTime()+rd+".mp3";
			url = urlNas+nombre;
			audio = fs.createWriteStream(url);
			audio.write(data);
			i++;
		} else {
			audio.write(data);
		}
	});
 
	req.on('end', function() {
		audio.end();
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(nombre);
	});
};

//DELETE : para borrar una cancion

exports.borraCancion = function (req, res) {
	
	var urlNas = "/mnt/nas/";
	var nombre = req.params.name;
	var url = urlNas+nombre;
	var fs = require('fs');
	fs.unlink(url);
	res.status(200);
	console.log("Borrado de : " +  findURL);

};


