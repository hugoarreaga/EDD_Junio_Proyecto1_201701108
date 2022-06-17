//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          MATRIZ ORTOGONAL /DISPERSA
//////////////////////////////////////////
class Nodo {
    constructor(fila, columna, valor) {
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
        this.derecha = null;
        this.izquierda = null;
        this.arriba = null;
        this.abajo = null;
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

    insertar(fila, columna, valor) {
        let nuevo = new Nodo(fila, columna, valor);

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

    recorrerFilas() {
        this.textAux = "DATOS POR FILAS:\n";
        let cFila = this.filas.primero;
        while (cFila != null) {
            let actual = cFila.acceso;
            while (actual != null) {
                this.textAux += " - " + actual.valor;
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
                this.textAux += "  " + actual.valor
                actual = actual.abajo

            }
            this.textAux += "\n"
            cColumna = cColumna.siguiente
        }
        console.log(this.textAux)
    }

    graphivz() {
        this.auxText = "digraph G{\n\n\tlabel=\" Desde Primero \" bgcolor=\"none\";\n"
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
                datosNodos += nodoActual + " [label = \"" + actual.valor + "\" group = " + actual.columna + "];\n"
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
        console.log(this.auxText)
        d3.select("#res").graphviz()
            .width(1000)
            .height(1000)
            .renderDot(this.auxText)

    }
}

function testM() {
    let matrix = new Matriz();
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let rfila = Math.floor(Math.random() * 9)
            let rcolumna = Math.floor(Math.random() * 8)
            if (i != j) {
                //matrix.insertar(i,j,i+"_"+j);dsafdfs
            }
            matrix.insertar(rfila, rcolumna, "F" + rfila + "C" + rcolumna);
        }
    }
    matrix.recorrerFilas();
    matrix.recorrerColumnas()
    matrix.graphivz()
}

testM();

//export { Matriz };



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
        this.auxInt=0
    }

    getNode(nombre) {
        this.auxNode = null
        this.getNode(this.root, nombre)
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
        console.log("suma " +this.auxInt)
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
    printPostOrder(nodo,actual) {
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
     * GRAFICAR arbo binario afds
     */
    graphviz() {
        this.auxText = "digraph G{\n\n\tlabel=\" Arbol ABB \" bgcolor=\"lightblue\";\n"
        this.auxText += "\tedge [ arrowsize=0.5];\n\tnode [style=filled,color=\".7 .3 1.0\" shape=plain];\n\tranksep = 0.5;\n"
        this.auxText += "\t/*DATOS DE LOS NODOS*/\n"
        this.datosNodos(this.root, "O")
        this.auxText += "\t/*DATOS DE LOS RELACIONES*/\n"
        this.datosRela(this.root, "O")


        this.auxText += "\n}"
        d3.select("#arbolabb").graphviz()
            .width(1000)
            .height(1000)
            .renderDot(this.auxText)
        console.log(this.auxText)

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
    for (let i = 0; i < 6; i++) {
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
    console.log(arb.size + " -----------------")
    arb.printAll()
    arb.graphviz()
}

//testTree()




//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          LISTA DE LIBROS
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////          LISTA DE LIBROS
//////////////////////////////////////////
class NodoL {
    constructor(nombre) {
        this.nombre = nombre
        this.cantidad = 0
        this.siguiente = null
        this.anterior = null
    }
}
class ListaL {
    constructor() {
        this.primero = null
        this.ultimo = null
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
    insertar(nombre) {
        let nuevo = new NodoL(nombre)
        if (this.getnode(nombre)) {
            this.getnode(nombre).cantidad ++ // aumentar la cantidad
        } else if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
        } else {
            this.ultimo.siguiente = nuevo
            nuevo.siguiente = this.ultimo
            this.ultimo = nuevo
        }
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
        this.telefono = telefono
        this.libros = new ListaL()

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
     * @param {Int} telefono 
     * @param {String} direccion 
     * @param {String} biografia 
     */
    insertar(dpi, nombre, user, correo, rol, pass, telefono) {
        let nuevo = new NodoU(dpi, nombre, user, correo, rol, pass, telefono)
        if (this.existUser(nombre)) {
            // ya existe
        } else if (this.primero == null) {
            this.primero = nuevo
            this.ultimo = nuevo
        } else {
            this.ultimo.siguiente = nuevo
            nuevo.anterior = this.ultimo
            this.ultimo = nuevo
        }
    }

    printUsers() {
        if (this.primero == null) {
            return
        }
        console.log("DATOS DE LOS CLIENTES")
        let actual = this.primero
        while (actual != null) {
            console.log("Usuario: " + actual.user + " Nombre: " + actual.nombre + " Pass: " + actual.pass)
            actual = actual.siguiente
        }
    }

    graphivzLL(){
        if(this.primero == null || this.primero.libros.primero == null){
            return//esta vacio
        }
        this.auxText = "digraph G{\n\n\tlabel=\" Desde Primero \" bgcolor=\"none\";\n"
        this.auxText += "\tedge [dir = both arrowsize=0.5];\n\tnode [style = filled color = skyblue];\nranksep = 0.25;\n"
        //this.auxText += "\tSize [ group = 0 label = \"" + this.size + "+" + this.size2 + "\"]\n"

        // DEFINIR NODOS
        let nodosUsers = "\t/* NODOS USUARIOS*/\n\tnode [shape = note ]\n"
        let nodosBooks = "\t/* NODOS ALBUMES*/\tnode [shape = component ]\n"
        let actual = this.primero
        while(actual != null){
            nodosUsers += "\t"+actual.dpi +" [label = \""+actual.nombre+"\"]\n"
            let actualBook = actual.libros.primero
            let numBook = 0
            while(actualBook != null){
                let label = actualBook.nombre +"\\ncopias: "+actualBook.cantidad
                nodosBooks += "\t"+actual.dpi+numBook +" [label =\""+label+"\"]\n"
                numBook++
                actualBook = actualBook.siguiente
            }
            actual = actual.siguiente
        }
        // DEFINIR RELACIONES
        let relaUsers = "\t/* RELACIONES USUARIOS*/\n"
        let relaBooks = "\t/* RELACIONES LIBROS*/\n"
        actual = this.primero
        while(actual.siguiente != null){
            relaUsers += "\t"+actual.dpi +" -> "+actual.siguiente.dpi
            let actualBook = actual.libros.primero
            let numBook = 0
            while(actualBook.siguiente != null){
                //let label = actualBook.nombre +"\\ncopias: "+actualBook.cantidad
                relaBooks += "\t"+actual.dpi+numBook +" -> "+actual.dpi +(numBook+1) +"\n"
                numBook++
                actualBook = actualBook.siguiente
            }
            actual = actual.siguiente
        }
        // DEFINIR RANKSAME
        let rankUsersFull = ""
        actual = this.primero
        while(actual != null){
            let rankUsers = "\t{ rank-same ; " +actual.dpi
            let actualBook = actual.libros.primero
            let numBook = 0
            while(actualBook != null){
                rankUsers += " "+actual.dpi+numBook+" ;"
                numBook++
                actualBook = actualBook.siguiente
            }
            rankUsers +=" } \n"
            rankUsersFull += rankUsers // unir ranksame actual al total
            actual = actual.siguiente
        }
        
        // UNIR TODOS
        this.auxText += nodosUsers
        this.auxText += nodosBooks
        this.auxText += relaUsers
        this.auxText += relaBooks
        this.auxText += rankUsersFull
        this.auxText += "\n}"

        console.log("DATOS LISTA DE LISTA")
        console.log(this.auxText)

    }
}

testListList()
function testListList(){
    let aa = new ListaUsuario()

    for (let i = 0; i < 15; i++) {
        aa.insertar("dpi","nombre"+i,"user"+i,"correo","rol","password",1515)
        let usuarioActual = aa.get_node("nombre"+i)

        for (let j = 0; j < 8; j++) {
            let ram = Math.floor(Math.random() * 5)

            usuarioActual.libros.insertar("libro"+ram)
            
        }
        
    }

    aa.graphivzLL()
}



///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////     TEST DE CARGAS MASIVAS
///////////////////////////////////////////////
///////////////////////////////////////////////

let users = new ListaUsuario()//


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
            console.log(nombre)
            users.insertar(dpi, nombre, user, correo, rol, pass, telefono)// insertar
        }
        users.printUsers()
    }
    lector.readAsText(str);
}

document.getElementById("fileUsers").addEventListener('change', fillUsers, false)    /// usuarios



let autores = new ArbolBinario()

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

            console.log(biografia)
            autores.insertar(dpi, nombre, correo, telefono, direccion, biografia)// insertar
        }
        autores.graphviz()
    }
    lector.readAsText(str);
}

document.getElementById("fileAutors").addEventListener('change', fillAutors, false)    /// usuarios



function fillBooks(e) {

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

            console.log(biografia)
            autores.insertar(dpi, nombre, correo, telefono, direccion, biografia)// insertar
        }
        autores.graphviz()
    }
    lector.readAsText(str);

    //showBooks //llamar a actualizar libros
}

document.getElementById("fileBooks").addEventListener('change', fillBooks, false)    /// usuarios



/**
 * MOSTRAR TODOS LOS LIBROS DISPONIBLES CARGADOS
 * EN EL SELECTOR
 * -- como update cada vez que se cargan libros
 */
function showBooks(e) {

}



//[50, 10, 60, 20, 70, 30, 80, 40, 90] avl
function bin(){
    let exmbin = new ArbolBinario()
    let data = [ 30,50,10,5,25,15,40,35,20,45     ]
    data.forEach(element => {
        exmbin.insertar(1, element, 5, 6, 7, 8)
    });
    exmbin.printAll()
}
bin()