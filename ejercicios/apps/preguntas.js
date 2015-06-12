 var express = require('express');
 var app = express();
 
 
 
 app.get('/preguntas',function(req,res){//Creamos la pagina inicial
     res.send('<html>'
         +        '<title> Preguntas </title>'
         +        '<body>'
         +            '<h1> Preguntas </h1>'
        +            '<form method="get" action="/respuesta">'
        +                '<input type="hidden" name="pregunta" value="1"/></br>' //inicializamos el identificador de la pregunta
        +                '1. ¿Quién descubrió América?</br>'
        +                '<input type="text" name="respuesta"/></br>'
        +                '<input type="submit" value="Enviár"/>' 
        +            '</form></br></br>'
        
        +            '<form method="get" action="/respuesta">'
        +                '<input type="hidden" name="pregunta" value="2"/></br>'//inicializamos el identificador de la pregunta
        +                '2. ¿Capital de Portugal?</br>'
        +                '<input type="text" name="respuesta"/></br>'
        +                '<input type="submit" value="Enviár"/>' 
        +            '</form>'
        +        '</body>'
        +    '</html>')
});

app.get('/',function (req,res) {res.redirect('/preguntas')}); //redireccionamos a /preguntas en caso de introducir direcctorio raiz

app.get('/respuesta',function(req,res){
    switch (req.query.pregunta) { //seleccionamos la respuesta correcta y la 2ª página en funcion de la pregunta seleccionada 
        case '1':
            res.locals.condicion = /^[Cc]rist[óo]bal [Cc]ol[óo]n$/i;
			res.locals.ResCorrecta = 'Cristóbal Colón';
			res.locals.Pregunta = '¿Quién descubrió América?';
			res.locals.Seleccion = true;
            break;
        case '2':
			res.locals.condicion = /^[lL]isboa$/i;
            res.locals.ResCorrecta = 'Lisboa';
			res.locals.Pregunta = '¿Capital de Portugal?';
            break;
    }


    res.locals.acierto = res.locals.condicion.test(req.query.respuesta); //comprobamos la respuesta dada en /preguntas con la solucion teniendo en cuenta las expresiones regulares
	
    res.send('<html>'
        +        '<title> Respuesta </title>'
        +        '<body>'
        +            '<h1> Respuesta '
        +            function(){ return res.locals.acierto? //con esta funcion condicional, mostramos si las respuesta es correcta evaluando el valor de res.locals.acierto.
                        'correcta' : 'incorrecta'}() + '</h1>'
        +            '<strong>Ha constestado a la pregunta '+ req.query.pregunta + ': </strong>' 
		+ 			function(){return res.locals.Seleccion?
						'¿Quién descubrió América?':'¿Capital de Portugal?' }()+'</br>'
        +            '<strong>Su respuesta ha sido:</strong> ' + req.query.respuesta + '</br>'
        +            function() { return res.locals.acierto? 
                        '' : '</br>La respuesta correcta es: ' + res.locals.ResCorrecta}() 
        +            '</br><a href="./preguntas">Volver</a>'                        
        +        '</body>'
        +    '</html>')
});

app.get('*', function(req, res, next){//mostramos página no encontrada si la URL llama a un recurso no definido
    res.status(404);
    res.redirect('/404.html');
});

app.listen(8000);
