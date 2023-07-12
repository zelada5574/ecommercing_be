const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
    try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
    try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
    } catch (err) {
      res.status(400).json(err);
    }
  // create a new category
});

router.put('/:id', async (req, res) => {
    try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
    try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(category);
    } catch (err) {
      res.status(500).json(err);
    }
  // delete a category by its `id` value
});

module.exports = router;