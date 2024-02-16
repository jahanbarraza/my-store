const boom = require('@hapi/boom')
//creamos un  middlerware dinamco
function validatorHandlers(schema, property) {   //recibimos el esquema que vamos a validar y la propiedad
  return(req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, {abortEarly: false }); //{abortEarly: false } nos envia todos los erroes juntos y no uno a uno 
    if (error){
      next(boom.badRequest(error));q
    }
    next();
  }
}

module.exports = validatorHandlers;
;
