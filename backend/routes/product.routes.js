const productRouter = require('express').Router();
const { Product } = require('../db/models');

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.post('/', async (req, res) => {
  try {
    const {
      name, price, description, img,
    } = req.body;
    if (name && price && description && img) {
      const newProduct = await Product.create({
        user_id: req.session.userId,
        name,
        price,
        description,
        img,
      });
      res.status(201).json(newProduct);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({
      where: {
        id,
      },
    });
    res.status(201).json(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = productRouter;
