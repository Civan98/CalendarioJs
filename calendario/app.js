let meses = [
    { nombre: "Enero", dias: 31 },
    { nombre: "Febrero", dias: 28 },
    { nombre: "Marzo", dias: 31 },
    { nombre: "Abril", dias: 30 },
    { nombre: "Mayo", dias: 31 },
    { nombre: "Junio", dias: 30 },
    { nombre: "Julio", dias: 31 },
    { nombre: "Agosto", dias: 31 },
    { nombre: "Septiembre", dias: 30 },
    { nombre: "Octubre", dias: 31 },
    { nombre: "Noviembre", dias: 30 },
    { nombre: "Diciembre", dias: 31 },
];

let dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sabado",
];

//crear tabla
var tabla = document.getElementById("tabla");//seleccionamos estos elementos con este Id
var tablaBody = document.getElementById("tablaBody");

// Crea las celdas
let contador = 0;//contador para asignar los Id a los td
for (var i = 1; i <= 6; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 1; j <= 7; j++) {
        // Crea un elemento <td>
        contador++;//incrementamos para sumar 1 al Id
        var celda = document.createElement("td");
        celda.id = contador;//asigna el contador como Id del td
        hilera.appendChild(celda);//agrega la celda a la hilera
    }

    // agrega la hilera al final de la tabla (al final del elemento tablabody)
    tablaBody.appendChild(hilera);
}
tabla.appendChild(tablaBody); //posiciona el tablaBody debajo del elemento <table>


//Obtener fecha actual
const hoy = new Date();
let mesActu = hoy.getMonth();
let anioActu = hoy.getUTCFullYear();
let diaActu = hoy.getDay();

//Calcular año bisiesto
const esBisiesto = (year) => {
    return (year % 400 === 0) ? true : 
                (year % 100 === 0) ? false : 
                    year % 4 === 0;
  };

//obtener los elementos HTML con ese ID
let diasHTML = document.getElementById("dias");
let mesHTML = document.getElementById("mes");

//función para llenar el calendario
function llenarcale() {
    setear();//antes de llenarlo se setean los td de la tabla
    let bandera = esBisiesto(anioActu);//mandar a llamar la función de año bisiesto
    if(bandera){//si el año es bisiesto febrero tendra 29 dias
        meses[1].dias=29;
    }else{
        meses[1].dias=28;
    }
    let diaInicio = new Date(anioActu, mesActu, 1);  //obtener el primer día de la semana del mes actual
    for (let index = 1; index <= meses[mesActu].dias; index++) {//se toma la cantidad de dias del mes actual como limite del for
        document.getElementById(
            `${index + diaInicio.getDay()}`//al indice se le suma el dia de inicio para que el 1 empiece en ese día
        ).innerHTML = `${index}`;
    }
}

//función para setear la tabla
function setear() {
    for (let index = 1; index <= 42; index++) {
        document.getElementById(`${index}`).innerHTML = `&nbsp;`;
    }
}

//función para llenar el campo del mes en el HTML
function llenarMes() {
    llenarcale(); //manda a llamar a la función para llenar los dias del calendario
    mesHTML.innerHTML = `<h3>${meses[mesActu].nombre + " " + anioActu}</h3>`;
}
llenarMes();//se llama para que se llene inicialmente

//Funciones para adelantar y atrasar el mes
function mesAnt() {
    if (mesActu === 0) {
        //si el mes actual es enero, se decrementa en 1 el año y se coloca como mes actual diciembre
        anioActu--;
        mesActu = 11;
        llenarMes();
    } else {
        mesActu--;
        llenarMes();
    }
}

function mesPost() {
    if (mesActu === 11) {
        // si el mes actual es diciembre, se aumneta en 1 el año y se coloca como enero el mes actual
        anioActu++;
        mesActu = 0;
        llenarMes();
    } else {
        mesActu++;
        llenarMes();
    }
}

for (let index = 0; index < dias.length; index++) {
    diasHTML.innerHTML += `<td>${dias[index]}</td>`;
}
