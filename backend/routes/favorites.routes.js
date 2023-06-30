const savedRouter = require('express').Router();
const { Saved, Product } = require('../db/models');

savedRouter.get('/', async (req, res) => {
  try {
    const saved = await Saved.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: { model: Product },
      raw: true,
    });
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
});

savedRouter.post('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });
    const favoriteProduct = await Saved.findOne({
      where: { user_id: req.session.userId, product_id: product.id },
      raw: true,
    });
    if (!favoriteProduct) {
      const newFavorite = await Saved.create({
        user_id: req.session.userId,
        product_id: product.id,
      });
      const addFavorite = {
        id: newFavorite.id,
        user_id: req.session.id,
        product_id: product.id,
        'Product.name': product.name,
        'Product.description': product.description,
        'Product.price': product.price,
        'Product.img': product.img,
      };
      res.status(201).json(addFavorite);
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});

savedRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Saved.destroy({
      where: {
        user_id: req.session.userId,
        id,
      },
    });
    res.status(201).json(id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = savedRouter;
