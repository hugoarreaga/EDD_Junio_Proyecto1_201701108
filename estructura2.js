/**
 * NODO INTERNO DE LA MATRIZ
 */
class Nodo {
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
 * NODO DE LOS EJES DE LA MATRIZ
 */
class NodoE {
    constructor(id) {
        this.id = id
        this.accesoNodo = null
        this.siguiente = null
        this.anterior = null
    }
}

/**
 * LISTA PARA GUARDAR LOS NODOS DE LOS EJES
 */
class ListaE {
    constructor() {
        this.primero = null
        this.ultimo = null
    }
    setE(nuevo) {
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
        } else if (nuevo.id < this.primero.id) {
            nuevo.siguiente = this.primero
            this.primero.anterior = nuevo
            this.primero = nuevo
        } else {
            let actual = this.primero
            while (actual.siguiente != null) {
                if (nuevo.id < actual.siguiente.id) {
                    nuevo.siguiente = actual.siguiente
                    actual.siguiente.anterior = nuevo
                    nuevo.anterior = actual
                    actual.siguiente = nuevo
                    break
                }
                actual = actual.siguiente
            }
            if (actual.siguiente == null) {
                actual.siguiente = nuevo
                nuevo.anterior = nuevo
                this.ultimo = nuevo
            }
        }
    }
    getE(id) {
        let actual = this.primero
        while (actual != null) {
            if (actual.id == id) {
                console.log("eje.id ya existe")
                return actual
            }
        }
        return null
    }
}

/**
 *  MATRIZ DONDE SE ALMACENARAN LOS DATOS 
 */
class Matriz {
    constructor() {
        this.filas = new ListaE()
        this.columnas = new ListaE()
    }
    insertar(fila, columna, valor) {
        let nuevo = new Nodo(fila, columna, valor)

        let filaActual = this.filas.getE(fila)
        if (filaActual == null) {
            filaActual = new NodoE(fila)
            filaActual.accesoNodo = nuevo
            this.filas.setE()
        } else {
            if (nuevo.columna < filaActual.accesoNodo.columna) {
                nuevo.derecha = filaActual.accesoNodo
                filaActual.accesoNodo.izquierda = nuevo
                filaActual.accesoNodo = nuevo
            } else {
                let actual = filaActual.accesoNodo
                while (actual.derecha != null) {
                    if (nuevo.columna < actual.derecha.columna) {
                        nuevo.derecha = actual.derecha
                        nuevo.izquierda = actual
                        actual.derecha.izquierda = nuevo
                        actual.derecha = nuevo
                        return
                    }
                    actual = actual.derecha
                }
                if (actual.derecha == null) {
                    actual.derecha = nuevo
                    nuevo.izquierda = nuevo
                    this.ultimo = nuevo
                }
            }
        }

        let columnaActual = this.columnas.getE(columna)
        if (columnaActual == null) {
            columnaActual = new NodoE(columna)
            columnaActual.accesoNodo = nuevo
            this.columnas.setE(columnaActual)
        } else {

            if (nuevo.fila < columnaActual.accesoNodo.fila) {
                nuevo.abajo = columnaActual.accesoNodo
                columnaActual, accesoNodo.arriba = nuevo
                columnaActual.accesoNodo = nuevo
            } else {
                let actual = columnaActual.accesoNodo
                while (actual.abajo != null) {
                    if (nuevo.fila < actual.abajo.fila) {
                        nuevo.abajo = actual.abajo
                        nuevo.arriba = actual
                        actual.abajo.arriba = nuevo
                        actual.abajo = nuevo
                        return
                    }
                    actual = actual.abajo
                }
                if (actual.abajo == null) {
                    actual.abajo = nuevo
                    nuevo.arriba = actual
                    this.ultimo = nuevo
                }
            }
        }
    }

    printFilas() {
        let matris = ""
        let filaActual = this.filas.primero
        while (filaActual != null) {
            let actual = filaActual.accesoNodo
            let linea = ""
            while (actual != null) {
                matris += " " + actual.valor
                linea += " " + actual.valor
                actual = actual.derecha
            }
            console.log(linea)
            matris += "\n"
            filaActual = filaActual.siguiente
        }
        console.log(matris)
    }
}

function test(ii, jj) {
    let res = new Matriz()

    for (let i = 0; i < ii; i++) {
        for (let j = 0; j < jj; j++) {
            res.insertar(i, j, "F" + i + "C" + j)
        }
    }
    res.printFilas()
}

test(8, 9)