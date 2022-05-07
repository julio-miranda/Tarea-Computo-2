var cuerpo;

//variable movimiento 
var movimientos = 0;

var n = [];

//creamo nuestras variables
var marco1 = new Marco(true);
var marco2 = new Marco(false);
var marco3 = new Marco(false);

//variables para inicio del juego
var Aroseleccionada;
var origen;
var destino;

//funcion para un evento del marco 1
//selecciona los elementos del marco 1
function click1(){
	marco1.seleccionado = !marco1.seleccionado;
	click(marco1);
}

//funcion para un evento del marco 2
//selecciona los elementos del marco 2
function click2(){
	marco2.seleccionado = !marco2.seleccionado;
	click(marco2);
}

//funcion para un evento del marco 3
//selecciona los elementos del marco 3
function click3(){
	marco3.seleccionado = !marco3.seleccionado;
	click(marco3);
}
//funcion evento click
function click(marco){
	if (marco.seleccionado){
		seleccionarOrigenDestino(marco);
	}else{
		reiniciarOrigenDestino();
	}
}
//rellenanos los contenidos
function llenarContenido(){
	var contenido = new Array();

	for (var i = 0 ; i < 10 ; i++){
		contenido[i] = new Relleno();
	}

	return contenido;
}

//array contenido con su pocision
function llenarAros(numero){
	var contenido = new Array();
	for(i=1;i<10;i++){
		var A1 = eval(`Aros${i} = function(){
			this.caja = crearDiv();
			this.caja.setAttribute("id","Aros${i}");
			this.caja.setAttribute("class","Aros");
			this.valor = ${i-1};
		}`);
		var A2 = eval(`Aros${i}`);
	if(numero == 3){
			var A1;
			var A2;
			contenido[i-3] = new Relleno();
			contenido[i] = new A2();
	}
	else if(numero == 4){
			var A1;
			var A2;
			contenido[i-4] = new Relleno();
			contenido[i] = new A2();
	}
	else if(numero == 5){
			var A1;
			var A2;
			contenido[i-5] = new Relleno();
			contenido[i] = new A2();
	}
	else if(numero == 6){
			var A1;
			var A2;
			contenido[i-6] = new Relleno();
			contenido[i] = new A2();
	}
	else if(numero == 7){
			var A1;
			var A2;
			contenido[i-7] = new Relleno();
			contenido[i] = new A2();
	}
	else if(numero == 8){
			var A1;
			var A2;
			contenido[i-8] = new Relleno();
			contenido[i] = new A2();
	}
	else if(numero == 9){
			var A1;
			var A2;
			contenido[i-9] = new Relleno();
			contenido[i] = new A2();
	}
	else{
		alert("El dato no es valido solo se puede de un numero de 3 a 9 aros, Intentelo nuevamente")
		document.location = "index.html";
		return contenido;
	}
}
	return contenido;
}
 //creamos un elemento div
 function crearDiv(){
	var caja = document.createElement("div");
	return caja;
}
//agregamos atributos al div que hemos creado
function Relleno(){
	this.caja = crearDiv();
    this.caja.setAttribute("class","relleno")
}

//creamo un marco para poder las Aros
function Marco(cajaInicial){
	this.caja = crearDiv();
    this.caja.setAttribute("class","marco")
	this.seleccionado = false;
	this.contenido;
	if (cajaInicial){
		//creamo las Aros y le agregamos una clase de
		var numero = parseInt(prompt("numero de aros que desea agregar?"));
		n.push(numero);
		this.contenido = llenarAros(numero);
	}else {
		this.contenido = llenarContenido();
	}

	for (var i = 0 ; i < this.contenido.length ; i++){
		this.caja.appendChild(this.contenido[i].caja);
	}

	this.tieneAros = function(){
		var rellenos = 0;

		for (var i = 0 ; i < this.contenido.length; i++){
			//instanceof es una palabra clave que significa, literalmente, instancia de. Sí, se escribe sin espacio.
			if (this.contenido[i] instanceof Relleno){
				rellenos ++;
			}
		}

		if (rellenos == (this.contenido.length)){
			return false;
		}else {
			return true;
		}
	};

	this.obtenerArosuperior = function(){
		for (var i = 0 ; i < this.contenido.length; i++){
			if (!( this.contenido[i] instanceof Relleno)){
				return this.contenido[i];
			}
		}
	};

	this.quitarArosuperior = function(){
		for ( var i = 0; i < this.contenido.length ; i++ ){
			if ((!( this.contenido[i] instanceof Relleno)) && (this.contenido[i].valor != 9)){
				Aroseleccionada = this.contenido[i];
				this.contenido[i] = new Relleno();
				break;
			}
		}
	};

	this.insertarArosuperior = function(){
		for (var i = (this.contenido.length) ; i >= 0 ; i--){
			if ( this.contenido[i] instanceof Relleno){
				this.contenido[i] = Aroseleccionada;
				break;
			}
		}
	};

	this.redibujarCaja = function(){
		while (this.caja.hasChildNodes()){
			this.caja.removeChild(this.caja.lastChild);
		}

		for ( i = 0; i < this.contenido.length ; i++){
			this.caja.appendChild(this.contenido[i].caja);
		}
	};
}

function seleccionarOrigenDestino(marco){
	if (origen == undefined){
		if (marco.tieneAros()){
			origen = marco;
			origen.seleccionado = true;
		}else{ 
			alert("Esta vacio")
		}
	}else if (origen != undefined  && destino == undefined ){
		destino = marco;
		destino.seleccionado = true;

		if (origen != destino ){
			if (!destino.tieneAros() || origen.obtenerArosuperior().valor < destino.obtenerArosuperior().valor) {
				if ( origen.obtenerArosuperior().valor != 9 ){
					origen.quitarArosuperior();
					origen.redibujarCaja();
					destino.insertarArosuperior();
					destino.redibujarCaja();
					movimientos ++;
					actualizarContador();
				}		
			}else{
				alert("No se puede colocar uno mas grande sobre uno mas pequeño")
			}
		}
	}

	if (destino != undefined && origen != undefined ){
		reiniciarOrigenDestino();
	}

	if (comprobarVictoria()){
		victoria();
	}
}
//para poder aver puesto las Aros en el marco que se movieron
function comprobarVictoria(){
	if(n[0] == 3){
		if(marco3.contenido[0] instanceof Relleno && marco3.contenido[6] instanceof Relleno && marco3.contenido[7] instanceof Aros7 && marco3.contenido[9] instanceof Aros9){return true;}
		else{return false;}
	}
	else if(n[0] == 4){
		if(marco3.contenido[0] instanceof Relleno && marco3.contenido[5] instanceof Relleno && marco3.contenido[6] instanceof Aros6 && marco3.contenido[9] instanceof Aros9){return true;}
		else{return false;}
	}
	else if(n[0] == 5){
		if(marco3.contenido[0] instanceof Relleno && marco3.contenido[4] instanceof Relleno && marco3.contenido[5] instanceof Aros5 && marco3.contenido[9] instanceof Aros9){return true;}
		else{return false;}
	}
	else if(n[0] == 6){
		if(marco3.contenido[0] instanceof Relleno && marco3.contenido[3] instanceof Relleno && marco3.contenido[4] instanceof Aros4 && marco3.contenido[9] instanceof Aros9){return true;}
		else{return false;}
	}
	else if(n[0] == 7){
		if(marco3.contenido[0] instanceof Relleno && marco3.contenido[2] instanceof Relleno && marco3.contenido[3] instanceof Aros3 && marco3.contenido[9] instanceof Aros9){return true;}
		else{return false;}
	}
	else if(n[0] == 8){
		if(marco3.contenido[0] instanceof Relleno && marco3.contenido[2] instanceof Aros2 && marco3.contenido[9] instanceof Aros9){return true;}
		else{return false;}
	} 
	else if(n[0] == 9){
		if(marco3.contenido[0] instanceof Relleno && marco3.contenido[1] instanceof Aros1 && marco3.contenido[9] instanceof Aros9){return true;}
		else{return false;}
	}	
	else{return false;}
}

//victoria del juego
function victoria(){
	var textoTitulo = document.createTextNode("Felicidades Ganaste");
	var textoSubtitulo = document.createTextNode("Movimientos utilizados : " + movimientos );
	var c1 = document.querySelector("#TH");

	c1.style.width = "300px";
	c1.style.height = "100px";
	c1.style.marginLeft = "35%";
	//removemos los elementos de marco
	cuerpo.removeChild(marco1.caja);
	cuerpo.removeChild(marco2.caja);
	cuerpo.removeChild(marco3.caja);
	cuerpo.removeChild(document.getElementById("contador"));//contador a cada elemento click
	cuerpo.style.backgroundColor = "green";

	var titulo = document.createElement("h1");
	titulo.style.color = "red";
	titulo.appendChild(textoTitulo);

	var subtitulo = document.createElement("h2");
	subtitulo.style.color = "white";
	subtitulo.appendChild(textoSubtitulo);

	cuerpo.appendChild(titulo);
	cuerpo.appendChild(subtitulo);
}
//actualiza el contador del juego 
function actualizarContador(){
	var parrafo = document.getElementById("contador");
	parrafo.innerHTML = "Movimientos : " + movimientos;
}
//reinicia el juego
function reiniciarOrigenDestino(){
	if ( origen != undefined){
	origen.caja.style.borderColor = "black";
	origen.seleccionado = false;
	}

	if (destino != undefined){
		destino.seleccionado = false;
		destino.caja.style.borderColor = "black"; 
	}
	
	origen = undefined;
	destino = undefined;

	marco1.seleccionado = false;
	marco2.seleccionado = false;
	marco3.seleccionado = false;
}
//inicia el codigo
function iniciar(){
	cuerpo = document.getElementById("TH");
	cuerpo.style.textAlign = "center";
	
	cuerpo.appendChild(marco1.caja);
	cuerpo.appendChild(marco2.caja);
	cuerpo.appendChild(marco3.caja);

	marco1.caja.addEventListener("click", click1, false);
	marco2.caja.addEventListener("click", click2, false);
	marco3.caja.addEventListener("click", click3, false);

	var texto = document.createTextNode("Movimientos : " + movimientos);
	var parrafo = document.createElement("p");
	parrafo.setAttribute("id", "contador");
	parrafo.appendChild(texto);
	cuerpo.appendChild(parrafo);
}
document.getElementsByTagName("div")[2].setAttribute("id","div1")
document.getElementsByTagName("div")[3].setAttribute("id","TH")
window.addEventListener("load", iniciar, false);

var btn1 = document.createElement("button");
var btntext1 = document.createTextNode("Reiniciar");
btn1.setAttribute("onclick","reiniciar()");
btn1.appendChild(btntext1);
document.querySelector("#btn").appendChild(btn1);

function reiniciar(){
	document.location = "index.html";
}