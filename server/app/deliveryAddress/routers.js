const { police_check } = require('../middleware')
const deliveryAddressController = require('./controllers')
const router = require('express').Router()

router.post('/delivery-addresses',
police_check('create', 'DeliveryAddress'),
deliveryAddressController.store
)

module.exports = router