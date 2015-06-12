#!/bin/node

var fs = require('fs');
var path = require('path');

var merge = function(args){
	if(args.length < 4){
		console.log("\nUSAGE:",path.basename(args[1]),"<dest> <f1> <f2> .. <fn>");
		console.log("\tdest: Nombre del fichero destino.");
		console.log("\tf1-n: Nombre del / los ficheros a concatenar.");
		process.exit(1);
	}

	// Estrae el archivo destino
	var destino = args[2];
	var wStream = fs.createWriteStream(destino, {flags: 'a'});
	var rStream = [];

	// Apertura de streams de lectura
	for(var i in args){
		if(i>2){
			var filename = args[i]; 
			try{
				if(fs.statSync(filename).isFile()){
					rStream[i] = fs.createReadStream(filename);
					rStream[i].setEncoding('utf8');
					rStream[i].on('end', function ()     { console.log("Merge", this.path, "en",destino,"Finalizado.");	});
					rStream[i].on('error', function(err) { console.log("Error al procesar [",this.path,"]",err); });
				}
			}catch(e){
				console.log("Error:",filename,"archivo no encontrado.");
			}
		} 
	}
	// Procesa secuencialmente los streams de lectura
	for(var file in rStream) rStream[file].pipe(wStream);
}

merge(process.argv);