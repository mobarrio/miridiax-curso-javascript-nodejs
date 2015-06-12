var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/preguntas', function(req, res){
    res.send(
        '<!DOCTYPE html>'
    +    '<html>'
    +    '<head>'
    +        '<meta charset="UTF-8">'
    +        '<title> Formularios </title>'
    +    '</head>'
    +    '<body>'
    +        '<h1> Formularios GET y POST</h1>'
    +        '<form method="post" action="/respuestas">'
    +            '¿Quién descubrió América?<br>'
    +            '<input type="hidden" name="id" value="america"/>' //clave para saber a que pregunta se está respondiendo
    +            '<input type="text" name="nombre" placeholder="Conteste aquí"/>'
    +            '<br>'
    +            '<input id="q1" type="submit" value="Enviar"/>'
    +        '</form>'
    +        '<form method="post" action="/respuestas">'
    +            '¿Capital de Portugal?<br>'
    +            '<input type="hidden" name="id" value="portugal"/>' //clave para saber a que pregunta se está respondiendo
    +            '<input type="text" name="capital" placeholder="Conteste aquí"/>'
    +            '<br>'
    +            '<input id="q2" type="submit" value="Enviar"/>'
    +        '</form>'
    +    '</body>'
    +    '</html>'
    );
});

app.post('/respuestas', function(req, res){

    var resp;

    if(req.body.id == "america") //si el parámetro oculto es la primera pregunta...
    {
        resp = req.body.nombre.toLowerCase(); //obviamos letras mayúsculas
        resp = resp.replace(/ó/g, "o"); //obviamos acentos

        if(resp == "cristobal colon" || resp == "colon") //permitimos ambas respuestas
        {
            res.send('Respuesta correcta');
        }
        else res.send(
            'La respuesta correcta es "Cristóbal Colón"'
            + '<a href="/preguntas"> Vuelva a la página inicial'
            );
        }
    else //si el parámetro oculto es la segunda...
    {
        resp = req.body.capital.toLowerCase(); //obviamos letras mayúsculas

        if(resp == "lisboa")
        {
            res.send('Respuesta correcta');
        }
        else res.send(
            'La respuesta correcta es "Lisboa"'
            + '<a href="/preguntas"> Vuelva a la página inicial'
            );
    }

});

app.set('ip', 'localhost');
app.set('port', 3000);

app.listen(app.get('port'), function(){
    console.log("Esperando vista en " + app.get('ip') + ":" + app.get('port') + "/preguntas");
});
