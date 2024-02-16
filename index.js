const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandlers, boomErrorHandlers } = require('./middlewares/error.handler');


const app = express();
const port = 3000;

//midelwares
app.use(express.json());

const whitelist = ['http://localhost:8080','https://myapp.com'];
const options = {
  origin: ()=> {
    origin: (origin, callback )=> {
      if (whitelist.includes(origin)){
        callback(null, true);
      } else {
        callback( new Error('No permitido'))
      }

    }
  }
}
app.use(cors());

app.get("/", (req, res)=>{
  res.send('Hola Mi server en express');
})

app.get("/home", (req, res)=>{
  res.send('Esta es la pagina principal');
})

app.get("/nueva-ruta", (req, res)=>{
  res.send('Hola, soy una nueva ruta');
})

routerApi(app);2

//los middlewares de error es recomendable colocarlos despues de los router
app.use(logErrors);
app.use(boomErrorHandlers)
app.use(errorHandlers);




app.listen(port, ()=>{
  console.log('mi port' + port);
})


