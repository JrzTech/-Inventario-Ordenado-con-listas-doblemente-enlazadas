// Almacena los productos
class Inventario{
    constructor(){
        this.primero=null; // Variable para detectar al primer producto
    }

    veAgregate(producto,nodox){


        // Validamos que no se repita el código
        if(nodox.codigo === producto.codigo){
            console.log("El código del producto ya existe");
            return true;
        }

        if(producto.codigo < nodox.codigo){

            producto.ant = nodox.ant;
            producto.sig = nodox;

            if(nodox.ant != null) // Existe un anterior al nodo?
                nodox.ant.sig = producto;
            else
                this.primero = producto; // Si no hay un anterior quiere decir que estamos con el primero

            nodox.ant = producto;
            return false;
        }
        
        //Validamos que lleguemos al final
        if(nodox.sig === null){
            nodox.sig = producto;
            producto.ant = nodox;
            producto.sig = null;
            return false;
        }

        return this.veAgregate(producto,nodox.sig); // Si si tiene se repite el nodo
    }

    // Recibimos un objeto 'Producto'
    agregar(producto){
        //Validamos que sea el primero de la fila
        if(this.primero===null){
            this.primero=producto;
            return false;
        }
        // Retornamos lo que veAgregate decida (si está repetido o no)
        return this.veAgregate(producto, this.primero);
    }

    // Listamos todos los productos
    listar(){
        let cadena="";
        let aux = this.primero;
        // Validamos si la lista está vacía
        if (aux === null) {
            return "<p>No hay productos en el inventario.</p>";
        }
        // Recorremos todos los nodos, incluido el último
        while (aux !== null) {
            cadena += aux.infoHTML();
            aux = aux.sig;
        }
        return cadena;
    }

    // Mostramos los productos al inverso
    listarInverso(){

        let cadena = "";
        // Función recursiva para recorrer los nodos
        const recorrer = (nodox) => {

            if(nodox === null)
                return;
            recorrer(nodox.sig);
            // Se agrega después de recorrer los siguientes
            cadena += nodox.infoHTML();
        };
        recorrer(this.primero);
        return cadena;
    }

    buscar(codigo){

        // Comenzamos desde el primer producto
        let aux = this.primero;
        // Recorremos la lista mientras existan nodos
        while(aux !== null){

            // Comparamos el código del producto actual
            if(aux.codigo == codigo){
                console.log("Producto buscado");
                return aux.infoHTML();
            }
            // Avanzamos al siguiente producto
            aux = aux.sig;
        }
        // Si terminamos el recorrido, no se encontró
        return null;
    }

    eliminar(codigo){

        // Comenzamos desde el primer producto
        let aux = this.primero;

        // Recorremos la lista mientras existan nodos
        while(aux !== null){

            // Comparamos el código del producto actual
            if(aux.codigo == codigo){
                console.log("Producto encontrado");
                // Si es el primero
                if(aux.ant == null)
                    this.primero = aux.sig;
                else
                    aux.ant.sig = aux.sig;
                    
                //Si no es el último
                if(aux.sig != null)
                    aux.sig.ant = aux.ant;
                
                return true;
            }
            // Avanzamos al siguiente producto
            aux = aux.sig;
        }
    }

    extraerPrimero(){

        // Verificamos si la lista está vacía
        if(this.primero === null)
            return null;

        // Guardamos el primer producto
        let primero = this.primero;

        // Movemos el inicio al siguiente nodo
        this.primero = this.primero.sig;

        //Checamos que haya más elementos en el inv
        if(this.primero != null)
            this.primero.ant = null;

        primero.ant = null;
        primero.sig = null;

        // Retornamos el producto extraído
        return primero;
    }

    extraerUltimo(){

        let aux = this.primero;

        while(aux !== null){

            if(aux.sig==null){

                // Si solo está el primero
                if(aux.ant == null)
                    this.primero = null;
                else 
                    aux.ant.sig = null;
                
                aux.sig=null;
                aux.ant=null;

                return aux;
            }
            aux = aux.sig;
        }
    }

}
