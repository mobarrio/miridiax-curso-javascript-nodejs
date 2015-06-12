var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/preguntas', function (req, res){
	res.send('<!doctype html>' + 
        '<html class="no-js" lang="">' + 
            '<head>' + 
                '<meta charset="utf-8" />' + 
                '<meta http-equiv="x-ua-compatible" content="ie=edge" />' + 
                '<title>Nodejs</title>' + 
                '<meta name="viewport" content="width=device-width, initial-scale=1" />' + 
            '</head>' + 
            '<body>' + 
                '<form method="GET" action="/respuesta">' + 
                	'<input name="pregunta" type="hidden" value="1" />' + 
                	'<label>' + 
        	            '&iquest;Qui&eacute;n descubri&oacute; Am&eacute;rica?<br />' + 
        				'<input name="respuesta" type="text" value="" size="50" /><br /><br />' + 
        			'</label>' + 
        						
        			'<input type="submit" value="Enviar" />' + 
                '</form>' + 
                
        		'<br /><br />' + 
                
        		'<form method="GET" action="/respuesta">' + 
                	'<input name="pregunta" type="hidden" value="2" />' + 
                	'<label>' + 
        	            '&iquest;Capital de Portugal?<br />' + 
        				'<input name="respuesta" type="text" value="" size="50" /><br /><br />' + 
        			'</label>' + 
        			
        			'<input type="submit" value="Enviar" />' + 
                '</form>' +
           '</body>' +
        '</html>');
});

app.get('/respuesta', function (req, res){
    var pregunta = parseInt(req.query.pregunta),
    respuesta = req.query.respuesta.toLowerCase().replace(/^\s*|\s*$/, ""),
	salida = "Tu respuesta es correcta! ";
	
	if (pregunta == 1){
		if (respuesta != "cristobal colon"){
			salida = "Incorrecto, la respuesta correcta es: Cristobal Colon";
		}
	}else if (pregunta == 2){
		if (respuesta != "lisboa"){
			salida = "Incorrecto, la respuesta correcta es: Lisboa";
		}
	}else{
		salida = "Pregunta desconocida.";
	}
    
    salida += " <a href=\"/preguntas\">Volver a la p&aacute;gina inicial</a>";
    
    res.send(salida);
});

app.get('*', function (req, res){
	res.send('Pagina no Encontrada');
});

app.listen(80);