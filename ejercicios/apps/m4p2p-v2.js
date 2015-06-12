#!/bin/node

var express = require("express");
var app = express();

app.use(express.static(__dirname + '/'));

app.get('/',function (req,res) {res.redirect('/preguntas')});

app.get('/preguntas', function (req, res) {
  res.send('<!DOCTYPE html>'+
    '<html>'+
    ' <head>'+
    '   <meta charset="utf-8">'+
    '   <title>Preguntas</title>'+
    ' </head>'+
    ' <body>'+
    '   <h1>QUIZ</h1>'+
    '   <form id="frmPreg1"  action="/respuesta" method="GET">'+
    '     <div>¿Quién descubrió América?</div>'+
    '     <div>'+
    '       <input type="text" id="pregunta1" name="pregunta1" value="" placeholder="Respuesta!" />'+
    '       <input type="hidden" id="pregunta" name="pregunta" value="pregunta1">'+
    '       <input type="submit" value="Enviar">'+
    '     </div>'+
    '   </form>'+
    '   <br/>'+
    '   <form id="frmPreg2" action="/respuesta" method="GET">'+
    '     <div>¿Capital de Portugal?</div>'+
    '     <div>'+
    '       <input type="text" id="pregunta2" name="pregunta2" value="" placeholder="Respuesta!" />'+
    '       <input type="hidden" id="pregunta" name="pregunta" value="pregunta2">'+
    '       <input type="submit" value="Enviar">'+
    '     </div>'+
    '   </form>'+
    ' </body>'+
    '</html>');
});

app.get('/respuesta', function (req, res) {
  var respuesta = req.query[req.query.pregunta] || "";
  var respuestaOK = '';
  var respuestaINFO = '';
  var regex = '';

  if(req.query.pregunta === "pregunta1"){
    respuestaOK = 'Cristobal Colon';
    respuestaINFO = ", fue quién descubrió América.";
    regex = /^(colon|cristobal colon|colon cristobal)$/gi;
  }else if(req.query.pregunta === "pregunta2"){
    respuestaOK = 'Lisboa';
    respuestaINFO = ", es la capital de Portugal.";
    regex = /^(Lisboa)$/gi;
  }

  if( respuesta.match(regex) ){
    res.send('<!DOCTYPE html>'+
         '<html>'+
         '  <head>'+
         '    <meta charset="utf-8">'+
         '    <title>Respuesta</title>'+
         '  </head>'+
         '  <body>'+
         '    <h1>Respuesta Correcta "'+respuesta+respuestaINFO+'".</h1>'+
         '    <a href="/preguntas">Volver</a>'+
         '  </body>'+
         '</html>');
  }else{
    res.send('<!DOCTYPE html>'+
         '<html>'+
         '  <head>'+
         '    <meta charset="utf-8">'+
         '    <title>Respuesta</title>'+
         '  </head>'+
         '  <body>'+
         '    <h1>Respuesta Incorrecta</h1>'+
         '    La Respuesta "'+respuesta+ '" es incorrecta.'+
         '    <br/>'+
         '    La Respuesta correcta es: <b>'+respuestaOK+respuestaINFO+'</b>'+
         '    <br/><br/>'+
         '    <a href="/preguntas">Volver</a>'+
         '  </body>'+
         '</html>');
  }   
});

app.get('*', function (req, res) {
  res.send('<!DOCTYPE html>'+
           '<html>'+
           '  <head>'+
           '    <meta charset="utf-8">'+
           '    <title>Preguntas</title>'+
           '  </head>'+
           '  <body>'+
           '    <a href="/preguntas">PREGUNTAS</a>'+
           '  </body>'+
           '</html>');
});


var server = app.listen(80, function () {
  var host = "localhost";
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});