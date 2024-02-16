const express = require('express');
const ProductoServicio = require('../services/prdocuto.servicio');
const validatorHandlers = require('../middlewares/validator.handler');
const { createProductoSchema,
        updateProductoSchema,
        getProductoSchema } = require('../schemas/producto.schema');



const router = express.Router();
const servicio = new ProductoServicio();



router.get("/", async(req, res)=>{
  const productos = await servicio.find();
  res.json(productos);
})


router.get('/:id',
  validatorHandlers(getProductoSchema, 'params'),
  async(req, res, next) => {
  try {
    const {id} = req.params;
    const productos = await servicio.findOne(id);
    res.json(productos)
  } catch (error) {
    next(error);
  }

})

router.post('/',
  validatorHandlers(createProductoSchema, 'body'),
  async(req, res) => {
  const body = req.body;
  const newProdcut = await servicio.createProduct(body);
  res.status(201).json(newProdcut)
})

router.patch('/:id',
  validatorHandlers(getProductoSchema, 'params'),
  validatorHandlers(updateProductoSchema, 'body'),
  async(req, res) => {
  try {
    const { id } = req.params
    const body = req.body;
    const producto = await servicio.updateProduct(id, body)
    res.json(producto)

  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async(req, res) => {
  const { id } = req.params
  const producto = await servicio.deleteProduct(id);
  res.json(producto);
});




module.exports = router;
