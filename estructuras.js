/**
 * VALUE DEBERA DE SER EL OBJETO QUE ALMACENA LA ESTRUCTURA
 * Manejar un solo "nodo" para las estructuras lineales? y/n
 */
class nodo{
    /**
     * 
     * @param {String} value 
     */
    constructor(value){
        this.value = value
        this.abajo = null
        this.arriba = null
        this.derecha = null
        this.izquierda = null
    }
}

/**
 * CLASE NODO PARA ALMACENER LOS ENCABEZADOS 
 * DE LA CLASE MATRIZ
 */
class nodoE{
    /**
     * 
     * @param {int} id 
     */
    constructor(id){
        this.id = id
        this.acceso = null
        this.siguiente = null
        this.anterior = null
    }
}

/**
 * CLASE LISTA PARA ALMACENAR LOS EJES DE LA
 * MATRIZ 
 */
class listaE{
    constructor(){
        this.primero = null
        this.ultimo = null
    }

    /**
     * insertar en orden los datos en los ejes de la matriz
     * no es necesario de verificar repetidos
     * @param {nodoE} nuevo 
     */
    setE(nuevo){
        // es el primero
        if(this.primero == null){
            this.primero = nuevo
        // agregar al inicio    
        }else if(nuevo.id < this.primero.id){
            nuevo.siguiente = this.primero
            this.primero.anterior = nuevo
            this.primero = nuevo
        }else{
            // agregar en el medio
            let actual = this.primero
            while(actual.siguiente != null){
                if(nuevo.id < actual.siguiente.id){
                    nuevo.siguiente = actual.siguiente
                    nuevo.anterior = actual
                    actual.siguiente.anterior = nuevo
                    actual.siguiente = nuevo
                    break;
                }
                actual = actual.siguiente
            }
            // agregar al final
            if(actual.siguiente = null){
                actual.siguiente = nuevo
                nuevo.anterior = actual
                this.ultimo = nuevo
            }
        }
    }
    /**
     * retorna un objeto de tipo nodoE
     * @param { int} id 
     */
    getE(id){
        let actual = this.primero
        while(actual != null){
            if(actual.id == id){
                return actual
            }
            actual = actual.siguiente
        }
        return null
    }
}

/**
 * MATRIZ DISPERSA PARA ALMACENAR DATOS
 */
class Matriz{
    constructor(){
        this.filas = new listaE()
        this.columnas = new listaE()
    }
    /**
     * 
     * @param {int} fila 
     * @param {int} columna 
     * @param {String} dato 
     */
    insertar(fila,columna,dato){
        let nuevo = new nodo()
        
        // *-*-*-*-* metodo para omitir repetidos

        let filaActual = this.filas.getE(dato)
        // es el primero
        if(filaActual == null){
            filaActual = new nodoE(dato)
            filaActual.acceso = nuevo
            this.filas.setE(filaActual)
        }
    }
}

///// tema 2
let tareas = 4394      
let dias =[55 ,24, 61, 75 ,86 ,6, 49]
let dia = "";
//console.log(dias.length)
while(tareas >0){


  for(let i = 0; i<dias.length; i++){
    
    tareas -= dias[i]
    //console.log(tareas)
    if(tareas <101){
        console.log(tareas+" - "+i )
    }
    if(tareas <=0 ){
      dia = i
      //console.log(tareas)
      console.log("dia "+i)
      break
    }
  }
}

//////// tema 1
//ab(1,2)
let aa = 1
let bb = 2
let removidos=0;
let colas = []
colas.unshift(aa)
for(let i = 0; i<colas.length;i++){
    let actual = colas.shift()
    removidos--
    console.log(actual+" actuales")
    if(actual == bb){
        console.log("iguales")
        break
    }else{
        console.log("iteracion "+ i)
        colas.unshift(aa-1)
        colas.unshift(aa+1)
    }
}
console.log(removidos +"  removidso")



let lista = [17, 10, 12, 7, 11]
let n, i, k, aux;
    n = lista.length;
    console.log(lista); // Mostramos, por consola, la lista desordenada
    // Algoritmo de burbuja
    for (k = 1; k < n; k++) {
        for (i = 4; i < (n - k); i++) {
            if (lista[i] > lista[i + 1]) {
                aux = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = aux;
            }
        }
    }

console.log(lista)


function r1(a,b){
    if(a == 0){
        return 0
    }
    return b+r1(a-1,b-1)
}

console.log("r1 "+r1(1,0))