function agenda (titulo, inic) {
  var _titulo = titulo;
  var _contenido = inic;
 
  return {
    titulo: function()           { return _titulo; },
    meter:  function(nombre, tf) { _contenido[nombre]=tf; },
    tf:     function(nombre)     { return _contenido[nombre]; },
    borrar: function(nombre)     { delete _contenido[nombre]; },
    toJSON: function()           { return JSON.stringify(_contenido);},
    registros: function() {
      var count=0;
      for(var rec in _contenido) count++;
      return(count);
    },
    listar: function()          {
      var res = "";
      var idx=0;
      var lastRec = this.registros();
      for(var amigo in _contenido){ 
        res += amigo + (++idx === lastRec ? ": " : ", ") + _contenido[amigo] + " \n"; 
      }
      return(res);
    }
  }
}

var amigos = agenda ("Amigos",
             { Pepe: 113278561,
               José: 157845123,
               Jesús: 178512355
             });

// Salida Esperada: "Pepe, 113278561 \nJosé, 157845123 \nJesús: 178512355 \n"
console.log(amigos.listar());
