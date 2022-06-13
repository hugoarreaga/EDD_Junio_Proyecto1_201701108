/**
 * VALUE DEBERA DE SER EL OBJETO QUE ALMACENA LA ESTRUCTURA
 * Manejar un solo "Nodo" para las estructuras lineales? y/n
 */
class Nodo {
    /**
     * 
     * @param {int} fila 
     * @param {int} columna 
     * @param {String} valor 
     */
    constructor(fila, columna, valor) {
        this.fila = fila
        this.columna = columna
        this.valor = valor


        this.derecha = null
        this.izquierda = null
        this.arriba = null
        this.abajo = null
    }
}

/**
 * CLASE Nodo PARA ALMACENER LOS ENCABEZADOS 
 * DE LA CLASE MATRIZ
 */
class NodoE {
    /** 
     * @param {int} id nuevo identificador del nodo eje
     */
    constructor(id) {
        this.id = id/**INTEGER **/
        this.acceso = null

        this.siguiente = null
        this.anterior = null
    }
}

/**
 * CLASE LISTA PARA ALMACENAR LOS EJES DE LA
 * MATRIZ 
 */
class listaE {
    constructor() {
        this.primero = null
        this.ultimo = null
    }

    /**
     * insertar en orden los valors en los ejes de la matriz
     * no es necesario de verificar repetidos *por ahora
     * @param {NodoE} nuevo nodo encabezado para agreagar al eje
     */
    setE(nuevo) {
        // es el primero
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
            // agregar al inicio    
        } else if (nuevo.id < this.primero.id) {
            nuevo.siguiente = this.primero
            this.primero.anterior = nuevo
            this.primero = nuevo
        } else {
            // agregar en el medio
            let actual = this.primero
            while (actual.siguiente != null) {
                if (nuevo.id < actual.siguiente.id) {
                    nuevo.siguiente = actual.siguiente
                    nuevo.anterior = actual
                    actual.siguiente.anterior = nuevo
                    actual.siguiente = nuevo
                    break;
                }
                actual = actual.siguiente
            }
            // agregar al final
            if (actual.siguiente = null) {
                nuevo.anterior = actual
                actual.siguiente = nuevo
                this.ultimo = nuevo
            }
        }
    }
    /**
     * retorna un objeto de tipo NodoE
     * @param { int} id 
     */
    getE(id) {
        let actual = this.primero
        while (actual != null) {
            if (actual.id == id) {

                console.log("encontrado " + id)
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }
}

/**
 * MATRIZ DISPERSA PARA ALMACENAR valorS
 */
class Matriz {
    constructor() {
        this.nombre = ""
        this.filas = new listaE()
        this.columnas = new listaE()
        this.textAux = ""
    }
    /**
     * 
     * @param {int} fila 
     * @param {int} columna 
     * @param {String} valor 
     */
    insertar(fila, columna, valor) {
        let nuevo = new Nodo(fila, columna, valor)

        if( fila == columna == 1){
            console.log(22)
        }
        // *-*-*-*-* metodo para omitir repetidos

        /***
         *  AGREGAR NodoS EN EL EJE DE LAS FILAS
         * @param {NodoE} filaActual primer nodo del eje de filas
         */
        let filaActual = this.filas.getE(fila)
        // es el primero
        if (filaActual == null) {
            filaActual = new NodoE(fila)
            filaActual.acceso = nuevo
            this.filas.setE(filaActual)
        } else {
            // va al inicio
            if (nuevo.columna < filaActual.acceso.columna) {
                nuevo.derecha = filaActual.acceso
                filaActual.acceso.izquierda = nuevo
                filaActual.acceso = nuevo
            } else {
                // va en medio
                let actual = filaActual.acceso
                while (actual.derecha != null) {
                    if (nuevo.columna < actual.derecha.columna) {
                        nuevo.derecha = actual.derecha
                        actual.derecha.izquierda = nuevo
                        nuevo.izquierda = actual
                        actual.derecha = nuevo

                    }
                    actual = actual.derecha
                }
                // va al final
                if (actual.derecha == null) {
                    actual.derecha = nuevo
                    nuevo.izquierda = actual
                }
            }
        }
        /**
         *  AGREGAR Nodo EN EL EJE DE LAS COLUMNAS
         */
        let columnaActual = this.columnas.getE(columna)
        // es el primero
        if (columnaActual == null) {
            columnaActual = new NodoE(columna)
            columnaActual.acceso = nuevo
            this.columnas.setE(columnaActual)
        } else {
            // Va al inicio
            if (nuevo.fila < columnaActual.acceso.fila) {
                nuevo.abajo = columnaActual.acceso
                columnaActual.acceso.arriba = nuevo
                columnaActual.acceso = nuevo
            } else {
                // va en el medio
                let actual = columnaActual.acceso
                while (actual.abajo != null) {
                    if (nuevo.fila < actual.abajo.fila) {
                        nuevo.abajo = actual.abajo
                        actual.abajo.arriba = nuevo
                        nuevo.arriba = actual
                        actual.abajo = nuevo
                        break
                    }
                    actual = actual.abajo
                }
                // va al final
                if (actual.abajo == null) {
                    actual.abajo = nuevo
                    nuevo.arriba = actual
                }
            }
        }

    }

    printFilas() {
        this.textAux = "VALORES  DE LA  MATRIZ POR FILAS\n"
        let filass = 0
        let aaa = ""

        let filaActual = this.filas.primero
        while (filaActual != null) {
            aaa = "|| "
            let NodoActual = filaActual.acceso
            while (NodoActual != null) {
                this.textAux += "  " + NodoActual.valor
                aaa += "  " + NodoActual.valor
                NodoActual = NodoActual.derecha
            }
            console.log(aaa)
            filass++;
            filaActual = filaActual.siguiente
        }
        //document.write(res+ "\nfilas :"+filas)
        console.log(this.textAux)//+ "\nfilas :" + filas
    }



    printColumnas() {
        this.textAux = "VALORES  DE LA  MATRIZ POR columnas\n"
        let filass = 0
        let aaa = ""

        let columnaActual = this.columnas.primero
        while (columnaActual != null) {
            aaa = "|| "
            let NodoActual = columnaActual.acceso
            while (NodoActual != null) {
                this.textAux += "  " + NodoActual.valor
                aaa += "  " + NodoActual.valor
                NodoActual = NodoActual.abajo
            }
            console.log(aaa)
            filass++;
            columnaActual = columnaActual.siguiente
        }
        //document.write(res+ "\nfilas :"+filas)
        console.log(this.textAux)//+ "\nfilas :" + filas
    }
}


let ss = new Matriz()
function testMatriz() {

    let apr = " --- "
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            apr += " " + i + "|" + j
            ss.insertar(i, j, "F" + i + "C" + j)
        }
        apr += "\n ----"
    }
    console.log(apr)

    ss.printFilas()

    ss.printColumnas()
}

testMatriz()
//export {Matriz}
