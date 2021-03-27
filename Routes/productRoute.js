const express = require('express')
const router = express.Router()
const productModel = require('../Model/product');

router.get('/', async (req, res) => {
    const allProducts = await productModel.find().limit(50)
    res.json(allProducts)
})

router.get('/skip=:skip', async (req, res) => {
    const allProducts = await productModel.find().limit(50).skip(parseInt(req.params.skip))
    res.json(allProducts)
})

router.post('/insert', async (req, res) => {
    const product = new productModel({
        productName: req.body.productName,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        imageLink: req.body.imageLink
    })
    try {
        const insertProduct = await product.save();
        insertProduct['status'] = 200
        res.json(insertProduct)
    }
    catch (err) {
        res.json({ message: err })
    }
});


module.exports = router