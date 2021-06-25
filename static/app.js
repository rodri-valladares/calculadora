const displayValorAnterior = document.getElementById("valor-anterior");
const displayValorActual = document.getElementById("valor-actual");
const botonesNumeros = document.querySelectorAll(".numero");
const botonesOperadores = document.querySelectorAll(".operador");
const botonSonido = document.getElementById("boton-sonido");

class RegistroCalculos {
  constructor(calculadora) {
    this.calculadora = calculadora;
  }

  registrarOperacion(operacion) {
    const request = new XMLHttpRequest();
    request.open("POST", window.location.href + "/calculos", true);
    request.setRequestHeader("content-type", "application/json;charset=utf-8");
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        console.log(request.responseText);
      }
    };
    const datos = {
      calculo: operacion,
    };
    request.send(JSON.stringify(datos));
  }

  sumar(num1, num2) {
    const resultado = this.calculadora.sumar(num1, num2);
    this.registrarOperacion(`${num1} + ${num2} = ${resultado}`);
    return resultado;
  }

  restar(num1, num2) {
    const resultado = this.calculadora.restar(num1, num2);
    this.registrarOperacion(`${num1} - ${num2} = ${resultado}`);
    return resultado;
  }

  dividir(num1, num2) {
    const resultado = this.calculadora.dividir(num1, num2);
    this.registrarOperacion(`${num1} / ${num2} = ${resultado}`);
    return resultado;
  }

  multiplicar(num1, num2) {
    const resultado = this.calculadora.multiplicar(num1, num2);
    this.registrarOperacion(`${num1} * ${num2} = ${resultado}`);
    return resultado;
  }
}

class Calculadora {
  sumar(num1, num2) {
    return num1 + num2;
  }

  restar(num1, num2) {
    return num1 - num2;
  }

  dividir(num1, num2) {
    return num1 / num2;
  }

  multiplicar(num1, num2) {
    return num1 * num2;
  }
}

//Clase que permite interactuar entre los botones y el display
class Display {
  constructor(displayValorAnterior, displayValorActual) {
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;
    this.calculador = new RegistroCalculos(new Calculadora());
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;
    this.signos = {
      sumar: "+",
      dividir: "/",
      multiplicar: "x",
      restar: "-",
    };
  }

  borrar() {
    this.valorActual = this.valorActual.toString().slice(0, -1);
    this.imprimirValores();
    botonSonido.play();
  }

  borrarTodo() {
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;
    this.imprimirValores();
    botonSonido.play();
  }

  /*Revisar*/
  computar(tipo) {
    this.tipoOperacion !== "igual" && this.calcular();
    this.tipoOperacion = tipo;
    this.valorAnterior = this.valorActual || this.valorAnterior;
    this.valorActual = "";
    this.imprimirValores();
  }

  /* revisar */
  agregarNumero(numero) {
    if (numero === "." && this.valorActual.includes(".")) return;
    this.valorActual = this.valorActual.toString() + numero.toString();
    this.imprimirValores();
  }

  imprimirValores() {
    this.displayValorActual.textContent = this.valorActual;
    this.displayValorAnterior.textContent = `${this.valorAnterior} ${
      this.signos[this.tipoOperacion] || ""
    }`; //permite visualizar el signo de la operacion
  }

  /*Funcion que toma los valores del display y se los pasa a Calculadora*/
  calcular() {
    const valorAnterior = parseFloat(this.valorAnterior);
    const valorActual = parseFloat(this.valorActual);

    if (isNaN(valorActual) || isNaN(valorAnterior)) return; //salva error por si se intenta parsear un string vacio
    this.valorActual = this.calculador[this.tipoOperacion](
      valorAnterior,
      valorActual
    );
  }
}

const display = new Display(displayValorAnterior, displayValorActual);

botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => {
    display.agregarNumero(boton.innerHTML);
    // botonSonido.play();
  });
});

botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () => {
    display.computar(boton.value);
    // botonSonido.play();
  });
});

// $.ajax({
//   type: "POST",
//   contentType: "application/json;charset=utf-8",
//   url: "/your/flask/endpoint",
//   traditional: "true",
//   data: JSON.stringify({names}),
//   dataType: "json"
//   });
