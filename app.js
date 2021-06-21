const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');

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
        this.calculador = new Calculadora();
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.signos = {
            sumar: '+',
            dividir: '/',
            multiplicar: 'x',
            restar: '-', 
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo(){
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo){
        
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();

    }

    agregarNumero(numero) {
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`; //permite visualizar el signo de la operacion
    }

    /*Funcion que toma los valores del display y se los pasa a Calculadora*/
    calcular(){
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if( isNaN(valorActual) || isNaN(valorAnterior)) return //salva error por si se intenta parsear un string vacio
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
    }
}

const display = new Display(displayValorAnterior, displayValorActual);

botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value))
});

