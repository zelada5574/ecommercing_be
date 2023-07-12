const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
    try {
      const tags = await Tag.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ error });
    }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Category and Tag data
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error });
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error });
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag);
  }
  catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tag);
  }
  catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;