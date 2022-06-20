//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          MATRIZ ORTOGONAL /DISPERSA
//////////////////////////////////////////
class Nodo {
    constructor(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria) {
        this.isbn = isbn
        this.nombreAutor = nombre_autor
        this.nombreLibro = nombre_libro;
        this.cantidad = cantidad
        this.fila = fila;
        this.columna = columna;
        this.paginas = paginas
        this.categoria = categoria
        this.derecha = null;
        this.izquierda = null;
        this.arriba = null;
        this.abajo = null;
    }
}

class ListaBooks{
    constructor(){
        this.primero = null
        this.ultimo = null
    }
    /** SE CREA UNA NUEVA LISTA CON LOS LIBROS DISPONIBLES Y SE ORDENAN ASCENTENTEMENTE
     *  DESDE EL INICIO */
    insertar(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria){
        let nuevo = new Nodo(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria)
        if(this.primero == null){
            this.primero = nuevo
        } else if (nuevo.nombreLibro < this.primero.nombreLibro) {
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
            this.primero = nuevo;
        } else {
            let actual = this.primero;
            while (actual.siguiente != null) {
                if (nuevo.nombreLibro < actual.siguiente.nombreLibro) {
                    nuevo.siguiente = actual.siguiente;
                    actual.siguiente.anterior = nuevo;
                    nuevo.anterior = actual;
                    actual.siguiente = nuevo;
                    break;
                }
                actual = actual.siguiente;
            }
            if (actual.siguiente == null) {
                actual.siguiente = nuevo;
                nuevo.anterior = actual;
                this.ultimo = nuevo;
            }
        }
    }

    /** SE CREA UNA NUEVA LISTA CON LOS LIBROS DISPONIBLES Y SE ORDENAN DESCENDENTEMENTE
     *  DESDE EL INICIO */
    insertarF(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria){
        let nuevo = new Nodo(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria)
        if(this.primero == null){
            this.primero = nuevo
        } else if (nuevo.nombreLibro > this.primero.nombreLibro) {
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
            this.primero = nuevo;
        } else {
            let actual = this.primero;
            while (actual.siguiente != null) {
                if (nuevo.nombreLibro > actual.siguiente.nombreLibro) {
                    nuevo.siguiente = actual.siguiente;
                    actual.siguiente.anterior = nuevo;
                    nuevo.anterior = actual;
                    actual.siguiente = nuevo;
                    break;
                }
                actual = actual.siguiente;
            }
            if (actual.siguiente == null) {
                actual.siguiente = nuevo;
                nuevo.anterior = actual;
                this.ultimo = nuevo;
            }
        }
    }

}

class NodoE {
    constructor(id) {
        this.id = id;
        this.acceso = null;
        this.siguiente = null;
        this.anterior = null;
    }
}

/**
 * NO SE AGREGA UNA FUNCION PARA OBTENER OBJETOS REPETIDOS
 * YA QUE PRIMERO SE OBTIENE EL NODOE Y SI NO SE OBTIENE SE AGREGA
 * SEGUN EL PROCESO PARA CREAR NODOS ACTUAL
 * POR LO TANTO NO SE PUEDEN AGREGAR NODOS REPETIDOS
 * 
 * solo se crea nuevos nodoE cuando ya se verifico que no existen
 */
class ListaE {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    setE(nuevo) {
        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;

        } else if (nuevo.id < this.primero.id) {
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
            this.primero = nuevo;
        } else {
            let actual = this.primero;
            while (actual.siguiente != null) {
                if (nuevo.id < actual.siguiente.id) {
                    nuevo.siguiente = actual.siguiente;
                    actual.siguiente.anterior = nuevo;
                    nuevo.anterior = actual;
                    actual.siguiente = nuevo;
                    break;
                }
                actual = actual.siguiente;
            }
            if (actual.siguiente == null) {
                actual.siguiente = nuevo;
                nuevo.anterior = actual;
                this.ultimo = nuevo;
            }
        }
    }

    getE(id) {
        let actual = this.primero;
        while (actual != null) {
            if (actual.id == id) {
                return actual;
            }
            actual = actual.siguiente;
        }
        return null;
    }
}

/**
 * FALTA AGREGAR METODO PARA OBTENER NODOS REPETIDOS
 */
class Matriz {
    constructor() {
        this.filas = new ListaE();
        this.columnas = new ListaE();
        this.textAux = "";
        this.size = 0;
        this.size2 = 0;
        this.ortogonal = false
    }
    getNode(fila, columna) {
        let cFila = this.filas.primero;
        while (cFila != null) {
            let actual = cFila.acceso;
            while (actual != null) {
                if (actual.fila == fila && actual.columna == columna) {
                    return actual
                }
                actual = actual.derecha;
            }
            cFila = cFila.siguiente;
        }
        return null
    }

    getNodebyIsbn(isbn) {
        let cFila = this.filas.primero;
        while (cFila != null) {
            let actual = cFila.acceso;
            while (actual != null) {
                if (actual.isbn == isbn) {
                    return actual
                }
                actual = actual.derecha;
            }
            cFila = cFila.siguiente;
        }
        return null
    }
    /**
     * RELLENAR LOS DATOS PARA UNA MATRIZ ORTOGONAL
     * @param {*} isbn 
     * @param {*} nombre_autor 
     * @param {*} nombre_libro 
     * @param {*} cantidad 
     * @param {*} fila 
     * @param {*} columna 
     * @param {*} paginas 
     * @param {*} categoria 
     */
    insertarLleno(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria) {
        let actual = this.getNode(fila, columna)
        actual.isbn = isbn
        actual.nombreAutor = nombre_autor
        actual.nombreLibro = nombre_libro;
        actual.cantidad = cantidad
        actual.fila = fila;
        actual.columna = columna;
        actual.paginas = paginas
        actual.categoria = categoria

    }

    /**
     * INSERTAR NUEVOS DATOS PARA UNA MATRIZ DISPERSA
     * @param {*} isbn 
     * @param {*} nombre_autor 
     * @param {*} nombre_libro 
     * @param {*} cantidad 
     * @param {*} fila 
     * @param {*} columna 
     * @param {*} paginas 
     * @param {*} categoria 
     * @returns 
     */
    insertar(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria) {
        let nuevo = new Nodo(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria);

        /// agregar metodo de nodos repetidos
        if (this.getNode(fila, columna)) {
            // ya existe
            console.log("ya exsite el nodo Fila: " + fila + " Columna: " + columna)
            return
        }

        //insertar en fila
        let cFila = this.filas.getE(fila);
        if (cFila == null) {
            cFila = new NodoE(fila);
            cFila.acceso = nuevo;
            this.filas.setE(cFila);
            this.size++;
        } else {
            if (nuevo.columna < cFila.acceso.columna) {
                nuevo.derecha = cFila.acceso;
                cFila.acceso.izquierda = nuevo;
                cFila.acceso = nuevo;
                this.size++;
            } else {
                let actual = cFila.acceso;
                while (actual.derecha != null) {
                    if (nuevo.columna < actual.derecha.columna) {
                        nuevo.derecha = actual.derecha;
                        nuevo.izquierda = actual;
                        actual.derecha.izquierda = nuevo;
                        actual.derecha = nuevo;
                        this.size++;
                        break;
                    }
                    actual = actual.derecha;
                }
                if (actual.derecha == null) {
                    actual.derecha = nuevo;
                    nuevo.izquierda = actual;
                    this.size++;
                }
            }
        }
        // insertar por columnas
        let cColumna = this.columnas.getE(columna);
        if (cColumna == null) {
            cColumna = new NodoE(columna);
            cColumna.acceso = nuevo;
            this.columnas.setE(cColumna);
            this.size2++;
        } else {
            if (nuevo.fila < cColumna.acceso.fila) {
                nuevo.abajo = cColumna.acceso
                cColumna.acceso.arriba = nuevo;
                cColumna.acceso = nuevo;
                this.size2++;
            } else {
                let actual = cColumna.acceso;
                while (actual.abajo != null) {
                    if (nuevo.fila < actual.abajo.fila) {
                        nuevo.abajo = actual.abajo;
                        nuevo.arriba = actual;
                        actual.abajo.arriba = nuevo;
                        actual.abajo = nuevo;
                        this.size2++;
                        break;
                    }
                    actual = actual.abajo;
                }
                if (actual.abajo == null) {
                    actual.abajo = nuevo;
                    nuevo.arriba = actual;
                    this.size2++;
                }
            }
        }

    }

    rellenar() {
        for (let i = 1; i <= 25; i++) {
            for (let j = 1; j <= 25; j++) {
                this.insertar("", "", "", "", i, j, "", "")
            }
        }
    }

    recorrerFilas() {
        this.textAux = "DATOS POR FILAS:\n";
        let cFila = this.filas.primero;
        while (cFila != null) {
            let actual = cFila.acceso;
            while (actual != null) {
                this.textAux += " - " + actual.nombreLibro;
                actual = actual.derecha;
            }
            this.textAux += "\n";
            cFila = cFila.siguiente;
        }
        console.log(this.textAux)

    }

    recorrerColumnas() {
        this.textAux = "DATOS POR COLUMNAS:\n";
        let cColumna = this.columnas.primero
        while (cColumna != null) {
            let actual = cColumna.acceso
            while (actual != null) {
                this.textAux += "  " + actual.nombreLibro
                actual = actual.abajo

            }
            this.textAux += "\n"
            cColumna = cColumna.siguiente
        }
        console.log(this.textAux)
    }

    /**
     * GENERAR UNA LISTA DE LIBROS MOSTRANDO LA COLA DE DISPONIBILIDAD
     */
    graphivzPilas() {
        if (this.filas.primero == null) {
            alert("aun no se han cargado libros")
            return
        }
        this.auxText = "digraph G{\n\n\tlabel=\" Pila de Ejemplares \" bgcolor=\"none\";\n"
        this.auxText += "\tnodesep = 0.25\n\t/*DATOS DE LOS NODOS*/\n"

        this.auxText += "\t\tedge [ style=invis];\n\tnode [style=filled,color=\"black\" fillcolor = \"paleturquoise\" shape=plaintext];\n\tranksep = 0;\n"
        // DATOS NODOS
        let datosNodos = "\t/* DATOS DE LOS NODOS*/"
        let datosRela = "\t/* DATOS DE LAS RELACIONES*/"
        let cFila = this.filas.primero;
        let numBook = 0
        while (cFila != null) {
            let actual = cFila.acceso;
            while (actual != null) {
                datosNodos += "\tT" + numBook + " [label = \"" + actual.nombreLibro + "\"]\n"
                datosNodos += "\C" + numBook + " [label = \"Cantidad: " + actual.cantidad + "\"]\n"
                let nodotabla = "\tP" + numBook + " [label=<<TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\">\t"
                for (let i = 1; i <= actual.cantidad; i++) {
                    nodotabla += "\t<TR><TD>Ejemplar: " + i + "</TD></TR>\n"
                }
                nodotabla += "\t</TABLE>>];\n" /// cerrar tabla individual
                //nodosPila += nodotabla + "\n"    // unir tablas

                datosRela += "\tT" + numBook + " -> P" + numBook + " -> C" + numBook + "\n"
                datosNodos += nodotabla
                numBook++
                actual = actual.derecha;
            }
            cFila = cFila.siguiente;
        }

        this.auxText += datosNodos + "\n"
        this.auxText += datosRela + "\n}"
        //console.log(this.auxText)
        d3.select("#pilaLibros").graphviz()
            .width(950)
            .height(800)
            .renderDot(this.auxText)
    }
    /**
     * GRAFICAR EL ARCHIVO DOT DE LA MATRIZ
     */
    graphivz() {
        let label = ""
        if (this.ortogonal == true) {
            label = "ORTOGONAL"
        } else if (this.ortogonal == false) {
            label = "DISPERSA"
        }

        if (this.filas.primero == null) {
            alert("aun no se han cargado libros")
            return
        }
        this.auxText = "digraph G{\n\n\tlabel=\" " + label + " \" bgcolor=\"none\";\n"
        this.auxText += "\tedge [dir = both arrowsize=0.5];\n\tnode [style = filled color = skyblue shape=square];\nranksep = 0.25;\n"

        this.auxText += "\tSize [ group = 0 label = \"" + this.size + "+" + this.size2 + "\"]\n"
        this.auxText += "\tSize -> F" + this.filas.primero.id + "\n"
        this.auxText += "\tSize -> C" + this.columnas.primero.id + "\n"
        /**
         * DEFINICION DE LOS NODOS DE TIPO EJE
         */
        // filas
        let datosVectores = ""
        let cFila = this.filas.primero
        while (cFila != null) {
            datosVectores += "\tF" + cFila.id + " [group = 0];\n"
            cFila = cFila.siguiente
        }
        // columnas
        let cColumna = this.columnas.primero
        while (cColumna != null) {
            datosVectores += "\tC" + cColumna.id + " [group = " + cColumna.id + " ];\n"
            cColumna = cColumna.siguiente
        }
        /**
         * DEFINICION DE LOS NODOS INTERNOS DE LA MATRIZ
         */
        let datosNodos = ""
        cFila = this.filas.primero;
        while (cFila != null) {
            let actual = cFila.acceso;
            while (actual != null) {
                let nodoActual = "\tF" + actual.fila + "C" + actual.columna
                datosNodos += nodoActual + " [label = \"" + actual.nombreLibro + "\\n" + actual.categoria + " \" group = " + actual.columna + "];\n"
                actual = actual.derecha;
            }
            cFila = cFila.siguiente;
        }
        /**
         * DEFINICION DE LAS RELACIONES DE LOS NODOS INTERNOS DE LA MATRIZ
         */
        // POR LA DERECHA
        let datosRela = ""
        cFila = this.filas.primero;
        while (cFila != null) {
            let actual = cFila.acceso;
            while (actual.derecha != null) {
                let nodoActual = "\tF" + actual.fila + "C" + actual.columna
                let nodoSiguiente = "\tF" + actual.derecha.fila + "C" + actual.derecha.columna
                datosRela += nodoActual + " -> " + nodoSiguiente + " \n"
                actual = actual.derecha;
            }
            cFila = cFila.siguiente;
        }
        // POR ABAJO
        cColumna = this.columnas.primero
        while (cColumna != null) {
            let actual = cColumna.acceso
            while (actual.abajo != null) {
                let nodoActual = "\tF" + actual.fila + "C" + actual.columna
                let nodoSiguiente = "\tF" + actual.abajo.fila + "C" + actual.abajo.columna
                datosRela += nodoActual + " -> " + nodoSiguiente + " \n"
                actual = actual.abajo
            }
            this.textAux += "\n<br>"
            cColumna = cColumna.siguiente
        }
        /**
         * DEFINICION DE LAS RELACIONES DE LOS NODOS EJES DE LA MATRIZ
         */
        // filas
        datosRela += "\n\t/*DATOS DE LAS RELACIONES VECTORES*/\n"
        cFila = this.filas.primero
        while (cFila.siguiente != null) {
            let actual = "\tF" + cFila.id
            let siguiente = "F" + cFila.siguiente.id
            datosRela += actual + " -> " + siguiente + " \n"
            cFila = cFila.siguiente
        }
        // columnas
        cColumna = this.columnas.primero
        while (cColumna.siguiente != null) {
            let actual = "\tC" + cColumna.id
            let siguiente = "C" + cColumna.siguiente.id
            datosRela += actual + " -> " + siguiente + " \n"
            cColumna = cColumna.siguiente
        }
        /**
         * DEFINICION DE LOS NODOS EJES CON LOS PRIMERO DATOS
         */
        // filas 
        datosRela += "\n\t/*RELACIONES DE LOS VECTORES CON LOS ACCESOS*/\n"
        cFila = this.filas.primero
        while (cFila != null) {
            let actual = "\tF" + cFila.id
            let acceso = "F" + cFila.acceso.fila + "C" + cFila.acceso.columna
            datosRela += actual + " -> " + acceso + " \n"
            cFila = cFila.siguiente
        }
        // columnas
        cColumna = this.columnas.primero
        while (cColumna != null) {
            let actual = "\tC" + cColumna.id
            let acceso = "F" + cColumna.acceso.fila + "C" + cColumna.acceso.columna
            datosRela += actual + " -> " + acceso + " \n"
            cColumna = cColumna.siguiente
        }
        /**
         * DATOS DE RANK-SAME DE TODOS LOS NODOS por filas
         */
        // filas de las columans
        let ranksame = "\t{rank = same; Size; "
        cColumna = this.columnas.primero
        while (cColumna != null) {
            ranksame += "C" + cColumna.id + "; "
            cColumna = cColumna.siguiente
        }
        ranksame += "}\n"
        // resto de datos
        cFila = this.filas.primero;
        while (cFila != null) {
            let actual = cFila.acceso;
            ranksame += "\t{rank = same; F" + cFila.id + "; "
            while (actual != null) {
                let nodoActual = "\tF" + actual.fila + "C" + actual.columna
                ranksame += nodoActual + " ; "
                actual = actual.derecha;
            }
            ranksame += "}\n"
            cFila = cFila.siguiente;
        }
        /**
         * UNIR TODOS LOS DATOS CREADOS EN EL STRING AUXILIAR
         */
        this.auxText += "\t/*DATOS DE LOS VECTORES*/\n"
        this.auxText += datosVectores
        this.auxText += "\t/*DATOS DE LOS 15 NODOS*/\n"
        this.auxText += datosNodos
        this.auxText += "\n\t/*DATOS DE LAS RELACIONES INTERNAS*/\n"
        this.auxText += datosRela + "\n"
        this.auxText += "\t/*DATOS DE LAS RANK-SAME*/\n"
        this.auxText += ranksame + " \n}"
        // agregar imagen a html
        //console.log(this.auxText)

        if (this.ortogonal == true) {
            d3.select("#fantasia").graphviz()
                .width(950)
                .height(800)
                .renderDot(this.auxText)
        } else if (this.ortogonal == false) {
            d3.select("#thriller").graphviz()
                .width(950)
                .height(800)
                .renderDot(this.auxText)
        }

    }
}

function testM() {
    let matrix = new Matriz();
    matrix.rellenar()  /// convertirla en ortogonal
    for (let i = 1; i < 30; i++) {
        for (let j = 0; j < 5; j++) {
            let rfila = Math.floor(Math.random() * 24) + 1
            let rcolumna = Math.floor(Math.random() * 24) + 1
            if (i != j) {
            }
            matrix.insertarLleno("isbn", "nombre_autor", "libro:\\nF" + rfila + "C" + rcolumna, "cantidad", rfila, rcolumna, i * j, "categoria");
        }
    }
    matrix.recorrerFilas();
    matrix.recorrerColumnas()
    matrix.graphivz(1, "ORTOGONAL")
}
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          ARBOL BINARIO DE BUSQUEDA PARA AUTORES
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          ARBOL BINARIO DE BUSQUEDA
//////////////////////////////////////////
class NodoArbol {
    constructor(dpi, nombre, correo, telefono, direccion, biografia) {
        this.nombre = nombre
        this.dpi = dpi
        this.correo = correo
        this.telefono = telefono
        this.direccion = direccion
        this.biografia = biografia

        this.left = null
        this.right = null
    }
}

class ArbolBinario {
    constructor() {
        this.root = null
        this.size = 0
        this.auxText = ""
        this.auxNode = null
        this.auxInt = 0
    }

    getNodeDpi(dpi){
        this.auxNode = null
        this._getNodeDpi(this.root, dpi)
        return this.auxNode
    }
    _getNodeDpi(nodo,dpi){
        if (nodo != null) {
            if (nodo.dpi == dpi) {
                this.auxNode = nodo
            }
            this._getNodeDpi(nodo.left,dpi)
            this._getNodeDpi(nodo.right,dpi)
        }
        
    }

    getNode(nombre) {
        this.auxNode = null
        this.getNode2(this.root, nombre)
        return this.auxNode
    }
    getNode2(nodo, nombre) {
        if (nodo == null) {
            return
        }
        if (nodo.nombre == nombre) {
            this.auxNode = nodo
        }
        this.getNode2(nodo.right)
        this.getNode2(nodo.left)
    }
    /**
     * METODO PRINCIPAL PARA INSERTAR NUEVA NODO EN EL ARBOL
     * @param {Stirng} nombre 
     */
    insertar(dpi, nombre, correo, telefono, direccion, biografia) {
        let nuevo = new NodoArbol(dpi, nombre, correo, telefono, direccion, biografia)
        if (this.root == null) {
            this.root = nuevo
            this.size++
        } else {
            this.insertarN(this.root, nuevo)
        }
    }
    /**
     * @param {NodoArbol} nodo Nodo actual que se este verificando 
     * @param {String} nombre 
     */
    insertarN(nodo, nuevo) {
        if (nuevo.nombre == nodo.nombre) {
            let a = 0 // ya existe
        } else if (nuevo.nombre < nodo.nombre) {
            if (nodo.left === null) {
                nodo.left = nuevo
                this.size++
            } else {
                this.insertarN(nodo.left, nuevo)
            }
        } else {
            if (nodo.right == null) {
                nodo.right = nuevo
                this.size++
            } else {
                this.insertarN(nodo.right, nuevo)
            }
        }
    }
    /**
     * metodo para llamar a todos los recorridos
     */
    printAll() {
        this.auxText = " DATOS INORDER\n"
        this.printInOrder(this.root)
        this.auxText += "\nDATOS PREORDER\n"
        this.printPreOrder(this.root)
        this.auxText += "\nDATOS POSTORDER\n"
        this.printPostOrder(this.root)
        //console.log("suma " + this.auxInt)
        this.auxText += "\nDATOS EXAMEN\n"
        this.printPostOrder2(this.root)
        console.log(this.auxText)
    }
    printInOrder(nodo) {
        if (nodo != null) {
            this.printPreOrder(nodo.left)
            this.auxText += " " + nodo.nombre
            this.printPreOrder(nodo.right)
        }
    }
    printPreOrder(nodo) {
        if (nodo != null) {
            this.auxText += " " + nodo.nombre
            this.printInOrder(nodo.left)
            this.printInOrder(nodo.right)
        }
    }
    printPostOrder(nodo, actual) {
        if (nodo != null) {
            this.printPreOrder(nodo.left)
            this.printPreOrder(nodo.right)
            this.auxText += " " + nodo.nombre
        }
    }

    printPostOrder2(nodo) {
        if (nodo != null) {

            this.printPostOrder2(nodo.left)
            this.printPostOrder2(nodo.left)
            this.auxText += " " + nodo.nombre
        }
    }


    /**
     * GRAFICAR arbo binario autores
     */
    graphviz() {

        if (this.root == null) {
            alert("Aun no se han cargado autores")
            return
        }
        this.auxText = "digraph G{\n\n\tlabel=\" Arbol ABB \" bgcolor=\"none\";\n"
        this.auxText += "\tsplines=false;\tedge [ arrowsize=0.5];\n\tnode [style=filled,color=\".7 .3 1.0\" shape=ellipse];\n\tranksep = 0.5;\n"
        this.auxText += "\t/*DATOS DE LOS NODOS*/\n"
        this.datosNodos(this.root, "O")
        this.auxText += "\t/*DATOS DE LOS RELACIONES*/\n"
        this.datosRela(this.root, "O")


        this.auxText += "\n}"
        d3.select("#arbolabb1").graphviz()
            .width(900)
            .height(800)
            .renderDot(this.auxText)
        //console.log(this.auxText)

    }
    datosNodos(nodo, nn) {
        if (nodo != null) {
            this.auxText += "\t" + nn + " [label = \"" + nodo.nombre + "\"] ;\n"
            this.datosNodos(nodo.left, nn + "L")
            this.datosNodos(nodo.right, nn + "R")
        }
    }
    datosRela(nodo, nn) {
        if (nodo == null) {
            return
        }
        if (nodo.left != null) {
            this.auxText += "\t" + nn + " -> " + nn + "L [label = \"L\"]; \n"
        }
        if (nodo.right != null) {
            this.auxText += "\t" + nn + " -> " + nn + "R [label = \"R\"]; \n"
        }
        this.datosRela(nodo.left, nn + "L")
        this.datosRela(nodo.right, nn + "R")
    }
}


function testTree() {
    let arb = new ArbolBinario()
    for (let i = 0; i < 15; i++) {
        let letras = "abcdef"//ghijklnmnopqrstuvwxyz
        let nombre = ""
        let sizeletra = Math.floor(Math.random() * 5) + 1
        for (let j = 0; j < sizeletra; j++) {
            let letrar = Math.floor(Math.random() * letras.length)
            nombre += letras[letrar]
        }

        arb.insertar("dpi", nombre, "correo", "telefono", "direccion", "biografia")
        //console.log(rfila)

    }
    //console.log(arb.size + " -----------------")
    //arb.printAll()
    arb.graphviz()
}

//testTree()



//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          COLA DISPONIBILIDAD DE LIBROS pendientes usuariso
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          COLA DISPONIBILIDAD DE LIBROS usuarios/general
//////////////////////////////////////////          ***PENDIENTES

class nodoDisp {
    constructor(nombre, isbn,libro,user) {
        this.nombre = nombre //AUTOR
        this.user = user
        this.isbn = isbn
        this.libro = libro
        this.cantidad = 1

        this.primero = null
        this.anterior = null
    }
}
/**
 * LISTA DE LIBROS PENDIENTES GENERAL
 */
class colaDisponibilidad {
    constructor() {
        this.primero = null
        this.ultimo = null
    }

    getBookisbn(isbn){
        let actual = this.primero
        while (actual != null) {
            if (actual.isbn == isbn) {
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }
    getNode(user, libro) {
        let actual = this.primero
        while (actual != null) {
            if (actual.user == user && actual.libro == libro) {
                console.log("PILA Cliente: "+user+" "+actual.user+" Libro: "+libro+" "+actual.libro)
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }
    /**
     * 
     * @param {*} nombre Autor del libro
     * @param {*} isbn ISBN del libro
     * @param {*} libro Nombre del libro
     * @param {*} user nombre del usuario
     */
    insertar(nombre,isbn, libro,user) {
        let nuevo = new nodoDisp(nombre,isbn, libro,user)
        let existente = this.getNode(user, libro)
        if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
        } else if (existente) {
            existente.cantidad++
        } else {
            this.ultimo.siguiente = nuevo
            nuevo.anterior = this.ultimo
            this.ultimo = nuevo
        }
    }
    /**RETORNA STRING DE GRAPHVZ PARA LOS PENDIENTES */
    graphivz(){
        this.auxText = "digraph G{\n\n\tlabel=\" Pila de Ejemplares x Usuario \" bgcolor=\"none\";\n"
        this.auxText += "\t\tedge [ ];\n\tnode [style=filled,color=\".7 .3 1.0\" shape=plaintext];\n\tranksep = 0;\n"
        this.auxText += "\tnodesep = 0.5\n\t/*DATOS DE LOS NODOS*/\n"

        // nodos y relaciones
        let relaciones = "\t/* RELACIONES DE LOS NODOS*/"
        let nodosLabel = ""
        let nodosCantidad = ""
        let nodosPila = ""
        let numBook = 0
        let actual = this.primero
        while (actual != null) {
            nodosLabel += "\tT" + numBook + " [label = \"" + actual.libro + "\"]\n"
            nodosCantidad += "\C" + numBook + " [label = \"Cantidad: " + actual.cantidad + "\"]\n"
            let nodotabla = "\tP" + numBook + " [label=<<TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\">\t"
            for (let i = 1; i <= actual.cantidad; i++) {
                nodotabla += "\t<TR><TD>Ejemplar: " + i + "</TD></TR>\n"
            }
            nodotabla += "\t</TABLE>>];\n" /// cerrar tabla individual
            nodosPila += nodotabla + "\n"    // unir tablas

            relaciones += "\tT" + numBook + " -> P" + numBook + " -> C" + numBook + "\n"
            numBook++
            actual = actual.siguiente
        }
        this.auxText += nodosLabel + "\n"
        this.auxText += nodosPila + "\n"
        this.auxText += nodosCantidad + "\n"
        this.auxText += relaciones + "\n}"
        console.log(this.auxText)
        return this.auxText
    }

    graphivzPila(){
        this.auxText = "digraph G{\n\n\tlabel=\" Pila de Ejemplares Usuarios \" bgcolor=\"none\";\n"
        this.auxText += "\t\tedge [ dir=back];\n\tnode [style=filled,color=\".7 .3 1.0\" shape=plaintext];\n\tranksep = 0.5;\n"
        this.auxText += "\trankdir= LR \n"
        this.auxText += "\tnodesep = 0.5\n\t/*DATOS DE LOS NODOS*/\n"

        // nodos y relaciones
        let relaciones = "\t/* RELACIONES DE LOS NODOS*/\n"
        let nodosLabel = "\t/* DEFINICION DE LOS NODOS*/\n"
        let numBook = 0
        let actual = this.primero
        
        while (actual != null) {
            let label = "Cliente: "+actual.user+" \\nLibro: " +actual.libro+" \\nCantidad: "+actual.cantidad
            nodosLabel += "\tN"+numBook +" [label =\""+label+"\" ]\n"
            numBook ++
            actual = actual.siguiente
        }

        /** RELACIONES */
        numBook = 0
        actual = this.primero
        while (actual.siguiente != null) {
            let label = "Cliente: "+actual.user+"\\nLibro: " +actual.libro+" \\nCantidad"+actual.cantidad
            nodosLabel += "\tN"+numBook +" -> N"+(numBook+1)+" \n"
            numBook ++
            actual = actual.siguiente
        }


        this.auxText += nodosLabel + "\n"
        this.auxText += relaciones + "\n}"
        console.log(this.auxText)
        return this.auxText
    }
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          LISTA DE LIBROS
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          LISTA DE LIBROS
//////////////////////////////////////////
class NodoL {
    /**
     * 
     * @param {String} nombre 
     */
    constructor(nombre) {
        this.nombre = nombre
        /**
         * @param {Int} cantidad numero de libros comprados
         */
        this.cantidad = 1
        this.id = 0
        this.siguiente = null
        this.anterior = null
    }
}
class ListaL {
    constructor() {
        this.primero = null
        this.ultimo = null
        this.cantidad = 0
        this.auxText = ""
    }
    getnode(nombre) {
        let actual = this.primero
        while (actual != null) {
            if (actual.nombre == nombre) {
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }
    // insertar al final
    /**
     * INSERTAR UN NUEVO LIBRO A LA LISTA DE USUARIOS
     * @param {String} nombre 
     */
    insertar(nombre) {
        let nuevo = new NodoL(nombre)
        if (this.getnode(nombre)) {// libro repetido
            this.aumentar(nombre)
        } else if (this.primero == null) {
            nuevo.id = 1
            this.primero = nuevo
        } else {

            let actual = this.primero
            while (actual.siguiente != null) {
                actual = actual.siguiente
            }
            nuevo.id = actual.id + 1
            actual.siguiente = nuevo
            nuevo.anterior = actual

        }
    }

    /**RETORNA LA CANTIDAD DE LIBROS CONTANDO COPIAS */
    get_size() {
        let size = 0
        let actual = this.primero
        while (actual != null) {
            size += actual.cantidad
            actual = actual.siguiente
        }
        return size
    }
    aumentar(nombre) {
        let actual = this.primero
        while (actual != null) {
            if (actual.nombre == nombre) {
                actual.cantidad++
            }
            actual = actual.siguiente
        }
    }

    prtin() {
        let actual = this.primero
        while (actual != null) {
            console.log("Libro: " + actual.nombre)
            actual = actual.siguiente
        }
    }

    /**
     * grapviz de lista de pilas por usuarios 
     *   xxxx malo
     */
    graphivzEjemplares() {
        this.auxText = "digraph G{\n\n\tlabel=\" Pila de Ejemplares \" bgcolor=\"none\";\n"
        this.auxText += "\t\tedge [ style=invis];\n\tnode [style=filled,color=\".7 .3 1.0\" shape=plaintext];\n\tranksep = 0;\n"
        this.auxText += "\tnodesep = 0.25\n\t/*DATOS DE LOS NODOS*/\n"

        // nodos y relaciones
        let relaciones = "\t/* RELACIONES DE LOS NODOS*/"
        let nodosLabel = ""
        let nodosCantidad = ""
        let nodosPila = ""
        let numBook = 0
        let actual = this.primero
        while (actual != null) {
            nodosLabel += "\tT" + numBook + " [label = \"" + actual.nombre + "\"]\n"
            nodosCantidad += "\C" + numBook + " [label = \"Cantidad: " + actual.cantidad + "\"]\n"
            let nodotabla = "\tP" + numBook + " [label=<<TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\">\t"
            for (let i = 1; i <= actual.cantidad; i++) {
                nodotabla += "\t<TR><TD>Ejemplar: " + i + "</TD></TR>\n"
            }
            nodotabla += "\t</TABLE>>];\n" /// cerrar tabla individual
            nodosPila += nodotabla + "\n"    // unir tablas

            relaciones += "\tT" + numBook + " -> P" + numBook + " -> C" + numBook + "\n"
            numBook++
            actual = actual.siguiente
        }
        this.auxText += nodosLabel + "\n"
        this.auxText += nodosPila + "\n"
        this.auxText += nodosCantidad + "\n}"

        return this.auxText

    }
}






//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          LISTA DE USUARIOS
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          LISTA DE USUARIOS
//////////////////////////////////////////
class NodoU {
    constructor(dpi, nombre, user, correo, rol, pass, telefono) {
        this.dpi = dpi
        this.nombre = nombre
        this.user = user
        this.correo = correo
        this.rol = rol
        this.pass = pass
        this.id = 0
        this.telefono = telefono
        this.libros = new ListaL()
        this.pendientes = new colaDisponibilidad()
        this.cantidad = 0

        this.siguiente = null
        this.anterior = null
    }
}
class ListaUsuario {
    constructot() {
        this.primero = null
        this.ultimo = null

        this.auxText = ""
        this.usuarioActual = null // login
    }

    getTotalBooks() {
        let total = 0
        let actual = this.primero
        while (actual != null) {
            let bactual = actual.libros.primero
            while (bactual != null) {
                total++
                bactual = bactual.siguiente
            }
            actual = actual.siguiente
        }
        return total
    }
    existUser(nombre) {
        let exist = false
        let actual = this.primero
        while (actual != null) {
            if (actual.nombre == nombre) {
                exist = true
            }
            actual = actual.siguiente
        }
        return exist
    }
    get_node(nombre) {
        let actual = this.primero
        while (actual != null) {
            if (actual.nombre == nombre) {
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }

    getUser(nombre, pass) {
        let actual = this.primero
        while (actual != null) {
            if (actual.user == nombre && actual.pass == pass) {
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }

    /** METODO PARA INSERTAR UN NUEVO USUARIO A LA LISTA
     * ESTE METODO LOS INSERTA ORDENADAMENTE
     * @param {Int} dpi 
     * @param {String} nombre  
     * @param {String} user
     * @param {String} correo 
     * @param {Int} telefono 
     * @param {String} direccion 
     * @param {String} biografia 
     */
    insertarO(dpi, nombre, user, correo, rol, pass, telefono) {
        let nuevo = new NodoU(dpi, nombre, user, correo, rol, pass, telefono)
        if (this.existUser(nombre)) {
            let a = 0// ya existe
            console.log(nombre)

        } else if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
        } else if (nuevo.nombre < this.primero.nombre) {
            nuevo.siguiente = this.primero
            this.primero.anterior = nuevo
            this.primero = nuevo
        } else {
            let actual = this.primero
            while (actual.siguiente != null) {
                if (nuevo.nombre < actual.siguiente.nombre) {
                    nuevo.siguiente = actual.siguiente
                    nuevo.anterior = actual
                    actual.siguiente.anterior = nuevo
                    actual.siguiente = nuevo
                    break
                }
                actual = actual.siguiente
            }
            if (actual.siguiente == null) {
                actual.siguiente = nuevo
                nuevo.anterior = actual
            }
        }
    }
    /**
     * METODO PARA INSERTAR EN LA LISTA DE USUARIOS (COLA)
     * @param {Int} dpi 
     * @param {String} nombre 
     * @param {String} user
     * @param {String} correo 
     * @param {String} rol 
     * @param {String} pass
     * @param {Int} telefono 
     */
    insertar(dpi, nombre, user, correo, rol, pass, telefono) {
        let nuevo = new NodoU(dpi, nombre, user, correo, rol, pass, telefono)
        if (this.existUser(nombre)) {
            // ya existe
        } else if (this.primero == null) {
            nuevo.id = 1
            this.primero = nuevo
            this.ultimo = nuevo
        } else {
            let actual = this.primero
            while (actual.siguiente != null) {
                actual = actual.siguiente
            }
            nuevo.id = actual.id + 1
            actual.siguiente = nuevo
            nuevo.anterior = actual
            this.ultimo = nuevo
        }
    }

    insertarTop(nombre, user, cantidad) {
        let nuevo = new NodoU("dpi", nombre, user," correo"," rol", "pass"," telefono")
        nuevo.cantidad = cantidad

        if(this.primero == null){
            this.primero = nuevo
            this.ultimo = nuevo
        } else if (nuevo.cantidad > this.primero.cantidad) {
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
            this.primero = nuevo;
        } else {
            let actual = this.primero;
            while (actual.siguiente != null) {
                if (nuevo.cantidad > actual.siguiente.cantidad) {
                    nuevo.siguiente = actual.siguiente;
                    actual.siguiente.anterior = nuevo;
                    nuevo.anterior = actual;
                    actual.siguiente = nuevo;
                    break;
                }
                actual = actual.siguiente;
            }
            if (actual.siguiente == null) {
                actual.siguiente = nuevo;
                nuevo.anterior = actual;
                this.ultimo = nuevo;
            }
        }
    }
    printUsers() {
        if (this.primero == null) {
            return
        }
        console.log("DATOS DE LOS CLIENTES")
        let actual = this.primero
        while (actual != null) {
            console.log("Usuario: " + actual.user + " Nombre: " + actual.nombre + " Cantidad: " + actual.cantidad)
            actual = actual.siguiente
        }
    }
    /** GRAFICAR LISTA DE LISTAS (USUARIOS-LIBROS)*/
    graphivzLL() {
        if (this.primero == null) {//|| this.primero.libros.primero == null
            alert("aun no existen usuarios")
            return//esta vacio
        }

        if (this.getTotalBooks() == 0) {
            alert("aun no hay ningun libro")
            return
        }
        this.auxText = "digraph G{\n\n\tlabel=\" LISTA DE LISTAS \" bgcolor=\"none\";\n\trankdir =LR\n"
        this.auxText += "\tedge [dir = both arrowsize=0.5];\n\tnode [style = filled ];\n\tranksep = 0.25;\n"

        // DEFINIR NODOS USUARIOS    Y LIBROS 
        let nodosUsers2 = "\t/* NODOS USUARIOS*/\n\tnode [shape = note color =royalblue]\n"
        let currentUser = this.primero
        while (currentUser != null) {
            nodosUsers2 += "\tU" + currentUser.id + " [label = \"" + currentUser.nombre + "\"]\n"
            let actualBook = currentUser.libros.primero
            while (actualBook != null) {
                let label = actualBook.nombre + "\\ncopias: " + actualBook.cantidad
                nodosUsers2 += "\tU" + currentUser.id + "L" + actualBook.id + " [label =\"" + label + "\"]\n"
                actualBook = actualBook.siguiente
            }
            currentUser = currentUser.siguiente
        }
        /** RELACIONES USUARIOS NUEVO  y con el primer libro*/
        let relaUsers2 = "\t/* RELACIONES USUARIOS*/\n"
        currentUser = this.primero
        if (currentUser != null) {
            relaUsers2 += "\tU" + currentUser.id + " -> U" + this.ultimo.id + " [constraint = false]\n"
        }
        while (currentUser.siguiente != null) {
            relaUsers2 += "\tU" + currentUser.id + " -> U" + (currentUser.id + 1) + "\n"
            currentUser = currentUser.siguiente
        }
        console.log(relaUsers2)
        /** RELACIONES LIBROS NUEVO */
        let relaBooks2 = "\t/* RELACIONES LIBROS*/\n"
        currentUser = this.primero
        while (currentUser != null) {
            if (currentUser.libros.primero != null) {
                relaBooks2 += "\tU" + currentUser.id + " -> U" + currentUser.id + "L" + currentUser.libros.primero.id + "\n"
                let actualBook = currentUser.libros.primero
                console.log(currentUser.nombre)
                console.log(actualBook.nombre)
                while (actualBook.siguiente != null) {
                    let actual = "\tU" + currentUser.id + "L" + actualBook.id
                    let next = " U" + currentUser.id + "L" + (actualBook.id + 1)
                    relaBooks2 += "\t" + actual + " -> " + next + "\n"
                    actualBook = actualBook.siguiente
                }
            }
            currentUser = currentUser.siguiente
        }

        // DEFINIR RANKSAME
        let rankUsersFull = "\t/*RANK-SAME DE LOS LIBROS*/\n"
        currentUser = this.primero
        while (currentUser != null) {
            let rankUsers = "\t{ rank = same ; U" + currentUser.id + " ; "
            let actualBook = currentUser.libros.primero
            while (actualBook != null) {
                let actual = "U" + currentUser.id + "L" + actualBook.id
                rankUsers += actual + " ; "
                actualBook = actualBook.siguiente
            }
            rankUsersFull += rankUsers + " } \n"
            currentUser = currentUser.siguiente
        }

        // UNIR TODOS
        this.auxText += nodosUsers2
        this.auxText += relaBooks2
        this.auxText += relaUsers2
        this.auxText += rankUsersFull
        this.auxText += "\n}"

        //console.log("DATOS LISTA DE LISTA")
        //console.log(this.auxText)
        d3.select("#listausuarioslibros").graphviz()
            .width(800)
            .height(800)
            .renderDot(this.auxText)

    }

    /**pila de cantidad de libros por usuario */
    graphivzPila(){
        if (this.getTotalBooks() == 0) {
            alert("aun no hay ningun libro")
            return
        }
        this.auxText = "digraph G{\n\n\tlabel=\" LISTA DE LISTAS \" bgcolor=\"none\";\n\trankdir =LR\n"
        this.auxText += "\tedge [ dir=back arrowsize=0.5];\n\tnode [style = filled ];\n\tranksep = 0.25;\n"

        // DEFINIR NODOS USUARIOS    Y LIBROS 
        let nodosUsers2 = "\t/* NODOS USUARIOS*/\n\tnode [shape = note color =royalblue]\n"
        let actual = this.primero
        while (actual != null) {
            //  nombre, isbn,libro,user
            let label = "Cliente: "+actual.user +"\\nLibro: "+actual.libro+"\\nCantidad: "+actual.cantidad
            nodosUsers2 +="\tN"+actual.dpi +" [label = \""+label+"\"] \n"
            actual = actual.siguiente
        }

        let relanodos ="\t/* RELACIONES USUARIOS*/\n\tnode [shape = note color =royalblue]\n"
        actual = this.primero
        while (actual.siguiente != null) {
            //  nombre, isbn,libro,user
            let label = "Cliente: "+actual.user +"\\nLibro: "+actual.libro+"\\nCantidad: "+actual.cantidad
            relanodos +="\tN"+actual.dpi +" -> N"+actual.siguiente.dpi+" \n"
            actual = actual.siguiente
        }

        this.auxText += nodosUsers2
        this.auxText += relanodos +"\n}"
        return this.auxText
    }
}

//
function testListList() {
    let aa = new ListaUsuario()
    for (let i = 0; i < 7; i++) {
        let dpi = Math.floor(Math.random() * 5)
        aa.insertar(i, "nombre" + i, "user" + i, "correo", "rol", "password", 1515)
        let usuarioActual = aa.get_node("nombre" + i)
        let lbs = Math.floor(Math.random() * 5)
        for (let j = 0; j < lbs; j++) {
            let ram = Math.floor(Math.random() * 5)
            usuarioActual.libros.insertar("libro" + ram)
        }
    }
    aa.graphivzLL()
}

//testListList()


///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////     FUNCIONES DE CARGAS MASIVAS
///////////////////////////////////////////////
///////////////////////////////////////////////


//llenar usuarios
function fillUsers(e) {
    let str = e.target.files[0]
    if (!str) { return }
    let lector = new FileReader()
    lector.onload = function (e) {
        const object = JSON.parse(e.target.result)
        for (const key in object) {
            let usuario = object[key]// objecto usuario
            let dpi = usuario.dpi
            let nombre = usuario.nombre_completo
            let user = usuario.nombre_usuario
            let correo = usuario.correo
            let rol = usuario.rol
            let pass = usuario.contrasenia
            let telefono = usuario.telefono
            //console.log(nombre)
            users.insertar(dpi, nombre, user, correo, rol, pass, telefono)// insertar
        }
        users.printUsers()
    }
    lector.readAsText(str);
}
document.getElementById("fileUsers").addEventListener('change', fillUsers, false)    /// usuarios

// llenar autores
function fillAutors(e) {
    let str = e.target.files[0]
    if (!str) { return }
    let lector = new FileReader()
    lector.onload = function (e) {
        const object = JSON.parse(e.target.result)
        for (const key in object) {
            let autor = object[key]// objecto autor
            let dpi = autor.dpi
            let nombre = autor.nombre_autor
            let correo = autor.correo
            let telefono = autor.telefono
            let direccion = autor.direccion
            let biografia = autor.biografia
            //console.log(biografia)
            autores.insertar(dpi, nombre, correo, telefono, direccion, biografia)// insertar
        }
        //autores.graphviz()
    }
    lector.readAsText(str);
}
document.getElementById("fileAutors").addEventListener('change', fillAutors, false)    /// usuarios

// llenar libros
function fillBooks(e) {
    let str = e.target.files[0]
    if (!str) { return }
    if (autores.root == null) {
        //return
    }

    let lector = new FileReader()
    lector.onload = function (e) {
        const object = JSON.parse(e.target.result)
        for (const key in object) {
            let libro = object[key]// objecto autor
            let isbn = libro.isbn
            let nombre_autor = libro.nombre_autor 
            let nombre_libro = libro.nombre_libro
            let cantidad = libro.cantidad
            let fila = libro.fila
            let columna = libro.columna
            let paginas = libro.paginas
            let categoria = libro.categoria

            if (categoria == "Fantasia") {
                librosFan.insertarLleno(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria)
            } else if (categoria == "Thriller") {
                librosTh.insertar(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria)
            }
            librosGen.insertar(isbn, nombre_autor, nombre_libro, cantidad, fila, columna, paginas, categoria)
            // insertar
        }
        //librosTh.graphivz()
        //librosFan.graphivz()
        //librosGen.graphivzPilas()
    }
    lector.readAsText(str);

    //showBooks //llamar a actualizar libros
}
document.getElementById("fileBooks").addEventListener('change', fillBooks, false)    /// libros

/** VERIFICAR SI SE INGRESO UN USUARIO EXISTENTE */
function loginUser() {
    currentUser = null
    let user = document.getElementById("userName").value
    let pass = document.getElementById("userPass").value
    document.getElementById("userPass").value = ""
    if (user == "" || pass == "") {
        alert("tiene campos vacios")
        return
    }
    currentUser = users.getUser(user, pass)
    if (currentUser != null) {
        if (currentUser.rol == "Administrador") {
            alert("BIENVENIDO ADMINISTRADOR")
            showAdmin()
        } else {
            alert("BIENVENIDO USUARIO \"" + currentUser.nombre + "\"")
            showSelectedUser()
        }
        fillUserData()
    } else {
        alert("el usuario o contraseña no existen")
    }
}

function showdocu() {
    if (showdocuB) {
        document.getElementById("docu").style.display = 'none'
        showdocuB = false
    } else {
        document.getElementById("docu").style.display = 'block'
        showdocuB = true
    }
}

function showBooks3() {//GENERAR 3 GRAPVHIZ
    librosTh.graphivz()
    librosFan.graphivz()
    librosGen.graphivzPilas()
}




function showResultados() {
    document.getElementById("fantasia").style.display = 'block';
    document.getElementById("thriller").style.display = 'block';
    document.getElementById("listausuarioslibros").style.display = 'none';
    document.getElementById("arbolabb").style.display = 'block';
}

/**CARGA DE USUARIO NORMAL */
function showSelectedUser() {
    document.getElementById("logindiv").style.display = 'none'
    document.getElementById("optionuser").style.display = 'block'
    document.getElementById("logout").style.display = 'block'
    //showResultados()
}

/**MOSTRAR ELEMENTOS DE LA PAGINA PRINCIPAL*/
function showHome() {
    currentUser = null
    
    document.getElementById("toplibs").style.display = "none"
    document.getElementById("watchB").style.display = "none"
    document.getElementById("librospendientes").style.display = "none"

    document.getElementById("arbolabb").style.display = 'none';
    document.getElementById("fantasia").style.display = 'block'
    document.getElementById("thriller").style.display = 'block'

    document.getElementById("pilaLibros").style.display = 'none'
    document.getElementById('listausuarioslibros').style.display = 'none'
    document.getElementById("optionuser").style.display = 'none'
    document.getElementById("docu").style.display = 'none'
    document.getElementById("logout").style.display = 'none'
    document.getElementById("divCargaUsers").style.display = 'none'
    document.getElementById("divCargaAutores").style.display = 'none'
    document.getElementById("divCargaLibros").style.display = 'none'
    document.getElementById("logindiv").style.display = 'block'// mostrar login
    document.getElementById("compralibros").style.display = 'none'
    document.getElementById("optionadmin").style.display = 'none'

    
    document.getElementById("pendientesAdmin").style.display = "none"
    document.getElementById("pendientesUser").style.display = "none"
    document.getElementById("pilapendientesUser").style.display = "none"
}

/** VISTA DE ADMINISTRADOR */
function showAdmin() {
    document.getElementById("logout").style.display = 'block'
    document.getElementById("divCargaUsers").style.display = 'block'
    document.getElementById("divCargaAutores").style.display = 'block'
    document.getElementById("divCargaLibros").style.display = 'block'// bloquear login
    document.getElementById("logindiv").style.display = 'none'// bloquear carga usuarios

    document.getElementById("optionadmin").style.display = 'block'
    showResultados()

}

function fillUserData() {
    if (currentUser.rol == "Usuario") {
        document.getElementById('nombreUser').textContent = "Bienvenido: " + currentUser.nombre
    } else {
        document.getElementById('nombreAdmin').textContent = "Bienvenido: " + currentUser.nombre
    }
}
function showCargaMasiva() {
    document.getElementById("divCargaUsers").style.display = 'block'
    document.getElementById("divCargaAutores").style.display = 'block'
    document.getElementById("divCargaLibros").style.display = 'block'
}

function hideoptionsAdmin() {//arbolabb usuariosLibros pilaLibros toplibrospendientes librospendientes
    
    document.getElementById("toplibs").style.display = "none"
    document.getElementById("watchB").style.display = "none"
    document.getElementById("librospendientes").style.display = "none"
    document.getElementById("pendientesAdmin").style.display = "none"
    document.getElementById("pendientesUser").style.display = "none"
    document.getElementById("pilapendientesUser").style.display = "none"


    document.getElementById("fantasia").style.display = 'none'
    document.getElementById("thriller").style.display = 'none'
    document.getElementById("topCompradores").style.display = 'none'
    document.getElementById("divCargaUsers").style.display = 'none'
    document.getElementById("divCargaAutores").style.display = 'none'
    document.getElementById("divCargaLibros").style.display = 'none'
    document.getElementById("arbolabb").style.display = 'none'
    document.getElementById("listausuarioslibros").style.display = 'none'
    document.getElementById("pilaLibros").style.display = 'none'
    document.getElementById("compralibros").style.display = 'none'
}
function showLibrerias() {

    document.getElementById("fantasia").style.display = 'block';
    document.getElementById("thriller").style.display = 'block';
    librosTh.graphivz()
    librosFan.graphivz()
}
function showCompra() {
    document.getElementById("compralibros").style.display = "block"

    let fff = document.getElementById("divFantasia") 
    fff.innerHTML = ''
    
    let gg = document.getElementById("shoplist") 
    gg.innerHTML =''
    let fff1 = document.getElementById("divThriller") 
    fff1.innerHTML = ''
    
    //<h3 class="w-100 titulo">LIBRERIA DE FANTASIA</h3>
    if (librosGen.columnas.primero == null) {
        alert("aun no se han guardado libros")
        return
    }
    let cFila = librosGen.filas.primero;
    while (cFila != null) {
        let actual = cFila.acceso;
        while (actual != null) {
            //agregar a la categoria divThriller
            if(actual.categoria == "Thriller"){
                addBook("divThriller",actual)
            }else if(actual.categoria == "Fantasia"){
                addBook("divFantasia",actual)
            }
            actual = actual.derecha;
        }
        cFila = cFila.siguiente;
    }
    
}

/**
 * añadir  libros disponibles
 * @param {*} categoria 
 * @param {*} libro 
 */
function addBook(categoria,libro){
    let libreria = document.getElementById(`${categoria}`)
    let libronuevo = document.createElement('div')
    libronuevo.className = 'libronuevo'
    libronuevo.innerHTML = `
        <div>
        <h4 class="titulo">${libro.nombreLibro}</h4>
        <div class="body">
            <p>Autor: ${libro.nombreAutor}</p>
            <p>isbn: ${libro.isbn}</p>
            <p>Cantidad: ${libro.cantidad}</p>
            <button type="button" class="btn btn-outline-success" onclick="consolebook(${libro.fila},${libro.columna})">Comprar</button>
        </div>
        </div>  
        `
    libreria.append(libronuevo)
}

/** AGREGAR ELEMENTOS AL CARRITO DE COMPRA */
function consolebook(i,j){
    let libro  = librosGen.getNode(i,j)
    let listado = document.getElementById("shoplist")


    let libronuevo = document.createElement('div')
    libronuevo.className = 'libronuevo'
    libronuevo.id = `${libro.isbn}`
    libronuevo.innerHTML = `
        <div>
            <h4 class="titulo">${libro.nombreLibro}</h4>
            <div class="body">
                <p>Autor: ${libro.nombreAutor}</p>
                <p>isbn: </p>
                
                <div id="isbn"> ${libro.isbn}</div>
                <p>Cantidad: ${libro.cantidad}</p>
            </div>
        </div>  
        `
    listado.append(libronuevo)
}

function restarlibrolibrerias(isbn){
    let general = librosGen.getNodebyIsbn(isbn)
    general.cantidad --
    let fant = librosFan.getNodebyIsbn(isbn)
    if(fant != null){
        fant.cantidad --
    }
    let th = librosTh.getNodebyIsbn(isbn)
    if(th != null){
        th.cantidad --
    }
    
}


function agregarlibrosC(){
    let listado2 = document.getElementById("shoplist")
    let listado = document.getElementById("shoplist").children


    console.log("elementos seleccionados: "+listado.length)
    for (let i = 0; i < listado.length; i++) {
        let isbnactual = listado[i].id
        let tempb = librosGen.getNodebyIsbn(isbnactual)
        if(tempb){
            //console.log("usuario: "+tempb.user)
            
            if(tempb.cantidad == 0){
                
                // agregar a pila de espera
                pendientes.insertar(tempb.nombreAutor,tempb.isbn, tempb.nombreLibro,currentUser.nombre)
                currentUser.pendientes.insertar(tempb.nombreAutor,tempb.isbn, tempb.nombreLibro,currentUser.nombre)
            }else{
                restarlibrolibrerias(isbnactual)
                currentUser.libros.insertar(tempb.nombreLibro)
            }
            //console.log(isbnactual)

        }
    }
    listado2.innerHTML  =''

}

function listAutores(){
    let listado = document.getElementById("listautors")
    listado.innerHTML  =''
    let res = document.getElementById("specificAutor")
    res.innerHTML = ''
    _addAutor(autores.root,listado)
}

function _addAutor(node,div){
    if(node != null){
        addAutor(div,node)
        _addAutor(node.left,div)
        _addAutor(node.right,div)
    }
}
function addAutor(listado, libro){
    let libronuevo = document.createElement('div')
    libronuevo.className = 'autordd'
    libronuevo.innerHTML = `
        <div class="autordd1">
        <h4 class="autordd">${libro.nombre}</h4>
        <hr>
        <div class="body">
            <p>DPI: ${libro.dpi}</p>
            <p>Telefono: ${libro.telefono}</p>
            <button type="button" class="btn btn-outline-success" onclick="specificAutor(${libro.dpi})">Mas Info</button>
        </div>
        </div>  
        `
    listado.append(libronuevo)
}

function specificAutor(libro1){
    let libro = autores.getNodeDpi(libro1)
    console.log(libro1)
    console.log(libro.nombre)
    let res = document.getElementById("specificAutor")
    res.innerHTML = ''
    let libronuevo = document.createElement('div')
    libronuevo.className = 'autoractaul'
    libronuevo.innerHTML = `
        <div>
        <h4 class="Nombre">${libro.nombre}</h4>
        <hr>
        <div class="body">
            <p>DPI: ${libro.dpi}</p>
            <p>Telefono: ${libro.telefono}</p>
            <p>Correo: ${libro.correo}</p><hr>
            <p>Direccion: ${libro.direccion}</p><hr>
            <h3>Biografia</h3>
            <p>${libro.biografia}</p>
        </div>
        </div>  
        `
    res.append(libronuevo)
}

function showBookList(){
    let templistD = new ListaBooks()
    if(librosGen.filas.primero == null){
        alert("aun no se han cargado libros")
        return
    }
    document.getElementById("watchB").style.display = "block"
    let templistA = new ListaBooks()
    let fila = librosGen.filas.primero
    while(fila != null){
        let book = fila.acceso
        while(book != null){
            templistD.insertar(book.isbn,book.nombreAutor,book.nombreLibro,book.cantidad,book.fila,book.columna, book.paginas,book.categoria)
            templistA.insertarF(book.isbn,book.nombreAutor,book.nombreLibro,book.cantidad,book.fila,book.columna, book.paginas,book.categoria)
            book = book.derecha
        }
        fila = fila.siguiente
    }
    bubblesort(templistD,templistA)
}

function bubblesort(list, dlist){
    document.getElementById("watchBA").innerHTML=''
    document.getElementById("watchBD").innerHTML=''

    let book = list.primero
    console.log("lista descendente de libros")
    while(book != null){
        boooook("watchBD",book)
        book = book.siguiente
    }

    book = dlist.primero
    console.log("lista ascendente de libros")
    while(book != null){
        boooook("watchBA",book)
        book = book.siguiente
    }


}

function boooook(div, libro){
    let listado = document.getElementById(div)


    let libronuevo = document.createElement('div')
    libronuevo.className = 'libronuevo'
    libronuevo.id = `${libro.isbn}`
    libronuevo.innerHTML = `
        <div>
            <h4 class="titulo">${libro.nombreLibro}</h4>
            <div class="body">
                <p>Autor: ${libro.nombreAutor}</p>
                <p>isbn: </p>
                
                <div id="isbn"> ${libro.isbn}</div>
                <p>Cantidad: ${libro.cantidad}</p>
            </div>
        </div>  
        `
    listado.append(libronuevo)
}

function showpendientes(){
    // general
    let resultado = pendientes.graphivz()
    
    document.getElementById("librospendientes").style.display = "block"
    document.getElementById("pendientesAdmin").style.display = "block"
    document.getElementById("pendientesUser").style.display = "block"
    document.getElementById("pilapendientesUser").style.display = "block"
    d3.select("#pendientesAdmin").graphviz()
            .width(800)
            .height(600)
            .renderDot(resultado)

    let res = currentUser.pendientes.graphivz()

    d3.select("#pendientesUser").graphviz()
            .width(800)
            .height(600)
            .renderDot(res)

    let tt = pendientes.graphivzPila()
    d3.select("#pilapendientesUser").graphviz()
    .width(800)
    .height(600)
    .renderDot(tt)
}
function showtopss(){
    document.getElementById("topsele").style.display = "block"
    document.getElementById("toplibs").style.display = "block"
    document.getElementById("topsele").innerHTML = ""

    let lib = document.getElementById("topsele")
    let tempuser = new ListaUsuario()

    let act = users.primero
    while(act != null){
        let size = 0
        let book = act.libros.primero
        while(book != null){
            size += book.cantidad
            book = book.siguiente
        }
        //console.log("libros: "+size)
        tempuser.insertarTop(act.nombre,act.user,size)
        //tempuser.insertar("dpi",act.nombre,act.user,"correo","rol","pass","tel")
        act = act.siguiente
    }

    tempuser.printUsers()
    let nn = 0
    act = tempuser.primero
    while(act != null && nn<5){
        listop("topsele",act)
        nn++
        act = act.siguiente
    }
}

function listop(div,libro){
    let listado = document.getElementById(div)


    let libronuevo = document.createElement('div')
    libronuevo.className = 'libronuevo'
    libronuevo.id = `${libro.nombre}`
    libronuevo.innerHTML = `
        <div>
            <h4 class="titulo">Nombre ${libro.nombre}</h4>
            <div class="body">
                <p>User: ${libro.user}</p>
                <hr>
                
                <p>Cantidad: ${libro.cantidad}</p>
            </div>
        </div>  
        `
    listado.append(libronuevo)
}

function sizeB(nodo){
    let size = 0
    let lib = nodo.libros
    if(nodo.libros.primero == null){
        return 0
    }
    let bk = nodo.libros.primero
    while(bk != null){
        size += bk.cantidad
        bk = bk.siguiente
    }
    return size
}

function optionsUserr(){
    let opcionSelected = document.getElementById("opcionesuser").selectedIndex
    if (opcionSelected == 0) {
        alert("opcion solo para administradores")
    } else if (opcionSelected == 1) {

        showCompra()
    } else if (opcionSelected == 2) {
        // tops
        showtopss()
    } else if (opcionSelected == 3) {
        showpendientes()
    } else if (opcionSelected == 4) {
        alert("opcion solo para administradores")
        //showCargaMasiva()
    } else if (opcionSelected == 5) {
        showLibrerias()
        librosFan.graphivz()
        librosTh.graphivz()
    } else if (opcionSelected == 6) {
        document.getElementById("pilaLibros").style.display = "block"
        librosGen.graphivzPilas()
    } else if (opcionSelected == 7) {
        alert("opcion solo para administradores")
        //document.getElementById("listausuarioslibros").style.display = "block"
        //users.graphivzLL()
    } else if (opcionSelected == 8){
        showBookList()
    }
}

function optionsAdmin() {
    let opcionSelected = document.getElementById("opcionesadmin").selectedIndex
    if (opcionSelected == 0) {
        document.getElementById("arbolabb").style.display = "block"
        document.getElementById("arbolabb1").style.display = "block"
        autores.graphviz()
        listAutores()
    } else if (opcionSelected == 1) {

        showCompra()
    } else if (opcionSelected == 2) {
        // tops
        
        showtopss()
    } else if (opcionSelected == 3) {
        showpendientes()
    } else if (opcionSelected == 4) {
        showCargaMasiva()
    } else if (opcionSelected == 5) {
        showLibrerias()
        librosFan.graphivz()
        librosTh.graphivz()
    } else if (opcionSelected == 6) {
        document.getElementById("pilaLibros").style.display = "block"
        librosGen.graphivzPilas()
    } else if (opcionSelected == 7) {
        document.getElementById("listausuarioslibros").style.display = "block"
        users.graphivzLL()
    } else if (opcionSelected == 8){
        showBookList()
    }
    //console.log(opcionSelected)

}

/////////////////////////////////
/////////////////////////////////   DEFINIR VARIABLES GOBLALES
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////   DEFINIR VARIABLES GOBLALES
/////////////////////////////////

//
let showdocuB = false


/// LIBROS DISPONIBLES
let librosTh = new Matriz()
let librosFan = new Matriz()
let librosGen = new Matriz()
librosFan.ortogonal = true
librosFan.rellenar()



/// LISTADO USUARIOS
let users = new ListaUsuario()//
users.insertar("2354168452525", "Wilfred Perez", "Wilfred", "admin@email.com", "Administrador", "123", "+502 (123) 123-4567")//

let admin = users.get_node("Wilfred Perez")
//admin.libros.insertar("d")

let pendientes = new colaDisponibilidad() 
// usuario actaul
let currentUser = null

//users.graphivzLL()



/// AUTORES
let autores = new ArbolBinario()


/// 
showHome()