const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ProductController');

// Rotas para produtos
router.route('/api/products')
    .get(controller.findAll)
    .post(controller.insertOne);

router.route('/api/products/:code')
    .get(controller.findOne)
    .put(controller.updateOne)
    .delete(controller.deleteOne);

// Rota para adicionar promoção
router.route('/api/products/:code/promotion')
    .put(controller.addPromotion)
    .delete(controller.removePromotion);

module.exports = router;
