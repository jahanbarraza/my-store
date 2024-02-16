const productosRouter = require('./productos.router')
const categoriasRouter = require('./categorias.router')
const usersRouter = require('./users.router')

function routerApi(app){
  app.use('/api/productos', productosRouter);
  app.use('/api/categorias', categoriasRouter);
  app.use('/api/users', usersRouter)

}

module.exports = routerApi;
