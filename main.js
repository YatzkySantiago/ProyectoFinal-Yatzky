let respuesta;
let estTramite = false;
let colVehiculos = [];

function registrarVehiculo(){
    let marca = prompt("Inserte marca del vehiculo: \n");
    marca = marca.toUpperCase();
    let modelo = prompt("Inserte modelo del vehiculo: \n");
    modelo = modelo.toUpperCase();
    const anio = prompt("Inserte año de fabricación: \n");
    class Vehiculo{
        constructor(){
            this.marca = marca;
            this.modelo = modelo;
            this.fabricacion = anio;
        }
    }
    const vehiculoCreado = new Vehiculo(marca, modelo, anio);
    return vehiculoCreado;
}

function consultaTramite(estadoTramite){
    let tiempo;
    tiempo = rng();
    if (estadoTramite){
        let coima = prompt("Le interesa coimear a un funcionario público para agilizar el trámite? \n 1- Si \n 2- No");
        switch(coima){
            case "1":
                alert("Su vehículo estará registrado en aproximadamente " + tiempo + " segundos.");
                break;
            case "2":
                alert("Su vehículo estará registrado en aproximadamente " + tiempo + " semanas.");
                break;
            default:
                alert("Opción incorrecta, vuelva a intentar pulsando 1 o 2.");
                break;
        }
    } else {
        alert ("Usted no tiene registros en trámite.");
    }
}

function rng(){ //esta función la utilizo para generar un numero aleatorio que despues lo uso como la cantidad de tiempo para los tramites.
    let tiempo = 0;
    tiempo = tiempo + (Math.random() * 100);
    return Math.round(tiempo);
}

function listarVehiculo(lista, obj){
    let nuevaCol = lista;
    nuevaCol.push(obj);
    return nuevaCol;
}

function objToString(lista){
    if (lista.length > 0) {
        let registroCompleto = "VEHÍCULOS REGISTRADOS: \n\n";
        for (let i = 0; i < lista.length; i++) {
            registroCompleto += "Marca: " + lista[i].marca + "\n";
            registroCompleto += "Modelo: " + lista[i].modelo + "\n";
            registroCompleto += "Año: " + lista[i].fabricacion + "\n\n"
        }
        return registroCompleto;
    } else {
        return ("No hay vehículos registrados.")
    }
}

alert("Bienvenido/a al sistema de registro automotor, a continuación elija la opción que necesite.");
do {
    respuesta = prompt("INSERTE OPCIÓN: \n 1- Registrar un vehículo \n 2- Consultar estado de trámite \n 3- Lista de vehículos registrados \n 4- Salir");
    switch (respuesta) {
        case "1":
            const vehiculoRegistrado = registrarVehiculo();
            alert("el registro de su " + vehiculoRegistrado.marca + " " + vehiculoRegistrado.modelo + " año " + vehiculoRegistrado.fabricacion + " está en trámite.");
            estTramite = true;
            colVehiculos = listarVehiculo(colVehiculos, vehiculoRegistrado);
            break;
        case "2":
            consultaTramite(estTramite);
            break;
        case "3":
            alert(objToString(colVehiculos));
            break;
        case "4":
            alert("Muchas gracias por utilizar el registro automotor.");
            break;
        default:
            alert("Opción incorrecta, vuelva a intentar pulsando un número del 1 al 4.");
            break;
    }
} while (respuesta != "4");