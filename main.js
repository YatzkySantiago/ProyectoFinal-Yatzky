let todoJoya = prompt("que haces loco, todo bien?")
if (todoJoya != "si" && todoJoya != "no") {
    alert("uhh me mataste, solo entiendo 'si' o 'no', pero acá te traigo calculadoras porque de matematicas si entiendo")
} else if (todoJoya == "si") {
    alert("buenisimo, te traigo calculadoras para que te diviertas")
} else {
    alert("mal ahi crack, pero te traigo calculadoras para que te diviertas")
}
do {
    let respuesta = prompt("INSERTE OPCION: \n 1- Calculadora de circunferencias y esferas \n 2- Calculadora de triangulos equilateros \n 3- No me gustan las matematicas(salir)")
    switch (respuesta) {
        case "1":
            let radioCirc = prompt("Insertá un valor de radio para calcular una circunferencia y esfera: ")
            let unMedidaCirc = prompt("Inserte unidad de medida (cm, m, km, etc): ")
            function calcCirc(radio, medida){
                let diametro = radio*2
                let perimetro = diametro * Math.PI
                let area = Math.PI * Math.pow(radio, 2)
                let area3 = diametro * perimetro;
                let volumen = 4/3 * Math.PI * Math.pow(radio, 3)
                return alert("Longitud de radio: " + radio + medida + "\n El diametro mide: " + diametro + medida + "\n El perimetro mide: " + perimetro + medida + "\n el area de la circunferencia mide: " + area + medida + "2" + "\n la superficie de la esfera mide: " + area3 + medida + "2" + "\n el volumen de la esfera es de: " + volumen + medida + "3")
            }
            calcCirc(radioCirc, unMedidaCirc)
            break;
        case "2":
            let ladoTri = prompt("Inserte longitud de lado: ")
            let unMedidaTri = prompt("Inserte unidad de medida (cm, m, km, etc): ")
            function calcTri(lado, medida) {
                let perimetroTri = lado * 3;
                let areaTri = (Math.sqrt(3)/4) * (Math.pow(lado, 2));
                return alert("el lado del triangulo es: " + lado + medida + "\n el perimetro del triangulo es: " + perimetroTri + medida + "\n el area del triangulo es: " + areaTri + medida + "2")
            }
            calcTri(ladoTri, unMedidaTri)
            break;
        case "3":
            alert("Bueno chau entonces")
            break;
        default:
            alert("che flaco, las opciones estaban CLARISIMAS. Probá de nuevo")
            break;
    }
} while (respuesta != "3");