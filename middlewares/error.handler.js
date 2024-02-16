//middlewares de error general para loguear errores
function logErrors(err,req, res, next) {
  console.log('logErrors');
  console.log(err);
  next(err);  // al enviar el next lo estamos ejecutando como un middleware como error que es enviado a otro middleware de error
}

// creamos otro que detecta un error que crea un formato para devolverselo al cliente
function errorHandlers(err, req, res, next) {
  console.log('errorHandlers');
  res.status(500).json({
    message: err.message,
    stack: err.stack    //stack para saber donde ocurrio el error
  })
}

function boomErrorHandlers(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    console.log(output);
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err)
  }

}

module.exports ={
  logErrors,
  errorHandlers,
  boomErrorHandlers
}
