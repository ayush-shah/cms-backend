const express = require('express')
const router = express.Router()
const productModel = require('../Model/product');

router.get('/', async (req, res) => {
    try {
        const allProducts = await productModel.find()
        res.json(allProducts)
    }
    catch (err) {
        res.json({ message: `Error: ${err}`, path: req.url })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const allProducts = await productModel.findById(req.params.id)
        res.json(allProducts)
    }
    catch (err) {
        res.json({ message: `Error: ${err}`, path: req.url })
    }
})


router.get('/limit=:limit?&skip=:skip?', async (req, res) => {
    try {
        const allProducts =
            req.params.limit && req.params.skip ?
                await productModel.find().limit(parseInt(req.params.limit)).skip(parseInt(req.params.skip)) :
                await productModel.find()
        res.json(allProducts)
    } catch (err) {
        res.json({ message: `Error: ${err}`, path: req.url })
    }
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