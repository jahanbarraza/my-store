const express = require('express');
const { faker } = require('@faker-js/faker');


const router = express.Router();


router.get("/", (req, res)=>{
  const categorias = [];
  const { size } = req.query;
  const limit = size || 10;
  let i = 0;
  for ( i = 0; i < limit; i++ ) {
    categorias.push({
      nombre: faker.commerce.productName(),
      precio: parseInt(faker.commerce.price(), 10),
      imagen: faker.image.imageUrl(),
    })
  }
  res.json(categorias);
})

/*traerme los productos de una categoria o traerle el id de un producto
que pertenezca a una categoria en especifico */
router.get("/:categoriaId/productos/:productoId", (req, res) => {
  const { categoriaId , productoId } = req.params;
  res.json({
    categoriaId,
    productoId
  });
});


router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'Producto Creado',
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body;
  res.json({
    message: 'Categoria Actualizada',
    data: body,
    id,
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    message: 'Categoria Eliminado',
    id,
  })
})

module.exports = router
