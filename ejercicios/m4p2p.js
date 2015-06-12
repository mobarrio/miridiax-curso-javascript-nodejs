#!/bin/node

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/'));

app.get('/',function (req,res) {res.redirect('/preguntas')});

app.get('/preguntas', function (req, res) {
	var respuesta = req.query[req.query.pregunta] || "";
	if(respuesta.toUpperCase() === "COLON" || respuesta.toUpperCase() === "CRISTOBAL COLON" || respuesta.toUpperCase() === "COLON CRISTOBAL"){
		res.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Respuesta</title></head><body><h1>Respuesta Correcta. '+respuesta+' descubrio América</h1><a href="/">Volver</a></body></html>');
	}else{
		res.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Respuesta</title></head><body><h1>Respuesta Incorrecta</h1>La Respuesta "'+respuesta+ '" es incorrecta.<br/>La Respuesta correcta es: <b>Cristobal Colon</b><br/><br/><a href="/">Volver</a></body></html>');
	}
});

app.get('/respuesta', function (req, res) {
	var respuesta = req.query[req.query.pregunta] || "";
	if(respuesta.toUpperCase() === "LISBOA"){
		res.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Respuesta</title></head><body><h1>Respuesta Correcta. '+respuesta+' es la capital de Portugal.</h1><a href="/">Volver</a></body></html>');
	}else{
		res.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Respuesta</title></head><body><h1>Respuesta Incorrecta</h1>La Respuesta "'+respuesta+ '" es incorrecta.<br/>La Respuesta correcta es: <b>Lisboa</b><br/><br/><a href="/">Volver</a></body></html>');
	}
});

app.get('*', function (req, res) {
  res.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Preguntas</title></head><body><h1>QUIZ</h1><form id="frmPreg1"  action="/preguntas" method="GET"><div>¿Quién descubrió América?</div><div><input type="text" id="pregunta1" name="pregunta1" value="" placeholder="Respuesta!" /><input type="hidden" id="pregunta" name="pregunta" value="pregunta1"><input type="submit" value="Enviar"></div> </form><br/><form id="frmPreg2" action="/respuesta" method="GET"><div>¿Capital de ortugal?</div><div><input type="text" id="pregunta2" name="pregunta2" value="" placeholder="Respuesta!" /><input type="hidden" id="pregunta" name="pregunta" value="pregunta2"><input type="submit" value="Enviar"></div></form></body></html>');
});


var server = app.listen(80, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});