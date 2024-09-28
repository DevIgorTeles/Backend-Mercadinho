const express = require('express')
const router = express.Router();
const controller = require('../Controllers/ProductController')


router.route('/api/products')

.get(controller.findAll)
.post(controller.insertOne)



router.route('/api/products/:code')
.get(controller.findOne)
.put(controller.updateOne)
.delete(controller.deleteOne)

module.exports = router;

