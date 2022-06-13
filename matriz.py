'''
Conferencia - Estructura de datos para el manejo de matrices con memoria dinamica
Curso - IPC2 Seccion B - Grupo 1
Expositor - Jorge Vasquez 
20 de marzo del 2021
'''

from nodos import Nodo, nodoEncabezado
from encabezados import listaEncabezado

# clase para el manejo de la matriz, controla tanto la insercion de nodos tipo encabezado 
# como la insercion de nodos internos a la matriz, se maneja ordenamiento ascendente
class matriz:
    def __init__(self):
        self.eFilas = listaEncabezado()  # instancia lista encabezados por filas
        self.eColumnas = listaEncabezado() # instancia lista encabezados por columnas
    
    def insertar(self, fila, columna, valor):
        nuevo = Nodo(fila, columna, valor)

        # insercion encabezado por filas
        eFila = self.eFilas.getEncabezado(fila)
        if eFila == None:                           # no existe el encabezado solicitado
            eFila = nodoEncabezado(fila)            # se crea el nuevo encabezado
            eFila.accesoNodo = nuevo
            self.eFilas.setEncabezado(eFila)        
        else:                                       # ya existe el encabezado solicitado
            if nuevo.columna < eFila.accesoNodo.columna: 
                nuevo.derecha = eFila.accesoNodo      # se inserta al inicio de esa lista
                eFila.accesoNodo.izquierda = nuevo
                eFila.accesoNodo = nuevo
            else:
                actual = eFila.accesoNodo
                while actual.derecha != None:
                    if nuevo.columna < actual.derecha.columna:
                        nuevo.derecha = actual.derecha  # se inserta en medio de la lista
                        actual.derecha.izquierda = nuevo
                        nuevo.izquierda = actual
                        actual.derecha = nuevo
                        break
                    actual = actual.derecha
                
                if actual.derecha == None:
                    actual.derecha = nuevo            # se inserta al final de la lista
                    nuevo.izquierda = actual
        

        # insercion encabezado por columnas
        eColumna = self.eColumnas.getEncabezado(columna)
        if eColumna == None:                           # no existe el encabezado solicitado
            eColumna = nodoEncabezado(columna)            # se crea el nuevo encabezado
            eColumna.accesoNodo = nuevo
            self.eColumnas.setEncabezado(eColumna)        
        else:                                       # ya existe el encabezado solicitado
            if nuevo.fila < eColumna.accesoNodo.fila: 
                nuevo.abajo = eColumna.accesoNodo      # se inserta al inicio de esa lista
                eColumna.accesoNodo.arriba = nuevo
                eColumna.accesoNodo = nuevo
            else:
                actual = eColumna.accesoNodo
                while actual.abajo != None:
                    if nuevo.fila < actual.abajo.fila:
                        nuevo.abajo = actual.abajo  # se inserta en medio de la lista
                        actual.abajo.arriba = nuevo
                        nuevo.arriba = actual
                        actual.abajo = nuevo
                        break
                    actual = actual.abajo
                
                if actual.abajo == None:
                    actual.abajo = nuevo            # se inserta al final de la lista
                    nuevo.arriba = actual
                       

    def recorrerFilas(self):
        eFila = self.eFilas.primero
        print("\n****************** Recorrido por filas ******************")

        while eFila != None:

            actual = eFila.accesoNodo
            print("\nFila "+str(actual.fila))
            print("Columna   Valor")
            while actual != None:
                print(str(actual.columna)+"         "+actual.valor)
                actual = actual.derecha
            
            eFila = eFila.siguiente        
        print("****************** Fin recorrido por filas ******************\n")


    def recorrerColumnas(self):
        eColumna = self.eColumnas.primero
        print("\n****************** Recorrido por columnas ******************")

        while eColumna != None:

            actual = eColumna.accesoNodo
            print("\nColumna "+str(actual.columna))
            print("Fila   Valor")
            while actual != None:
                print(str(actual.fila)+"      "+actual.valor)
                actual = actual.abajo
            
            eColumna = eColumna.siguiente            
        print("****************** Fin recorrido por columnas ******************\n")




m = matriz()
#parametros fila, columna, valor
m.insertar(1, 0, "adolfo")
m.insertar(2, 1, "brandon")
m.insertar(0, 1, "daniel")
m.insertar(1, 2, "eduardo")
m.insertar(0, 2, "diego")
m.insertar(0, 0, "javier")
m.recorrerFilas()
m.recorrerColumnas()