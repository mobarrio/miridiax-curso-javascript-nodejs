/*
 * Function: mod1_p2p
 * Argumentos: no tiene
 * Retorna: String
 * Descripcion: Esta funcion retorna un string formado por el numero PI delimitado a 9 decimales, dos lineas en blanco y un string UNICODE  por consola.
 */
var mod1_p2p = function(){
	return(Math.PI.toFixed(8).toString()+"\n\n\n\u55e8\uff0c\u4f60\u597d\u5417");
}

console.log(mod1_p2p());