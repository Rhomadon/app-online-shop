const router = require('express').Router()
const invoiceController = require('./controllers')

router.get('/invoice/:order_id', invoiceController.show)

module.exports = router