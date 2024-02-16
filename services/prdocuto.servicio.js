const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')


//trabajamos programacion orientada a objetos

class ProductoServicio {
  //creamos el constructor
  constructor(){
    this.productos = [];    //lo llevamos en memoria por que no tenemos aun BD
    this.generate();
  }

  //creamos el metodo
  async generate(){
    const limit = 100;
    let i = 0;
    for ( i = 0; i < limit; i++ ) {
      this.productos.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.productName(),
        precio: parseInt(faker.commerce.price(), 10),
        imagen: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  //Creamos las funciones
  async createProduct(data){
    const newProdcut = {
      id:faker.datatype.uuid(),       //genera un id ramdom
      ...data                         //concadena los valores que nos ingresan
    }
    this.productos.push(newProdcut)   //Agrega el nuevo producto a la lista de productos
    return newProdcut;
  }

  async find(){
    return new Promise((resolve, reject) => {
     setTimeout(()=>{
      resolve(this.productos);
     }, 5000)
    })
  }

  async findOne(id){
   const producto = this.productos.find( item => item.id === id );
   if (!producto) {
    throw boom.notFound('Produto no Encontrado')
   }
   if (producto.isBlock){
    throw boom.conflict('El Produto esta bloqueado')
   }
   return producto;
  }

  async updateProduct(id, changes){
    const index = this.productos.findIndex( item => item.id === id );
    if (index === -1 ){
      throw boom.notFound('Produto no Encontrado')

    }
    const producto = this.productos[index]
    this.productos[index]= {
      ...producto,      //mantenemos la informacion que tiene el objeto
      ...changes        // solo realiza el cambio del atributo que enviamos
    }
    return this.productos[index];
  }

  async deleteProduct(id){
    const index = this.productos.findIndex( item => item.id === id );   //findIndex me retorna la posicion del objeto
    if (index === -1 ){
      throw boom.notFound('Produto no Encontrado')
    }
    this.productos.splice(index, 1);                      //splice que nos permite enviar una posicion y cuantos elementos deseas eliminar apartir de esa posicion
    return {id}
  }

}

module.exports = ProductoServicio;
