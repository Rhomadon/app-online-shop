const router = require('express').Router()
const multer = require('multer')
const os = require('os')
const { police_check } = require('../middleware')

const productController = require('./controllers')

router.get('/products', productController.index)

router.post('/products', 
multer({dest: os.tmpdir()}).single('image'),
police_check('create', 'Products'),
productController.store)

router.put('/products/:id', multer({dest: os.tmpdir()}).single('image'), police_check('update', 'Products'), productController.update )

router.delete('/products/:id', police_check('delete', 'Products')
,productController.destroy)

module.exports = router