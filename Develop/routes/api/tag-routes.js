const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Product.findAll({
      include: [{ model: Product, through: ProductTag, as: "product_tags" }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Product.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "product_tags" }],
    });
    if (!tagData) {
      res.status(404).json({ message: "Product Does Not Exist!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  try {
    const tag = await Category.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTag = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Category.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
