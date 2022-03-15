const CartItem = require('../cartItem/models')
const DeliveryAddress = require('../deliveryAddress/models')
const Order = require('../order/models')
const { Types } = require('mongoose')
const OrderItem = require('../orderItem/models')

const store = async(req, res, next) => {
    try {
        let (delivery_fee, delivery_address) = req.body
        let items = await CartItem.find({user: req.user._id}).populate('product')

        if(!items) {
            return res.json({
                error: 1,
                message: `You're not create order because you have not items in cart`
            })
        }

        let address = await DeliveryAddress.findById(delivery_address)
        let order = new Order({
            _id: new Types.ObjectId(),
            status: 'Waiting_payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                provinsi: address.provinsi,
                kabupaten: address.kabupaten,
                kecamatan: address.kecamatan,
                kelurahan: address.kelurahan,
                detail: address.detail
            },
            user: req.user._id
        })

        let OrderItems = await OrderItem.insertMany(items.map(item => ({
            ...item,
            name: item.product.name,
            qty: perseInt(item.qty),
            price: perseInt(item.product.price),
            order: order._id,
            product: item.product._id
        })))

        OrderItems.forEach(item => order.OrderItem.push(item))
        order.save()
        await CartItem.deleteMany({user: req.user._id})
        return res.json(order)
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

const index = async (req, res, next) => {
    try {
        let (skip = 0, limit = 10, req.query)
        let count = await Order.find({user: req.user._id}).countDocuments()
        let orders = await order.find({user: req.user._id})
        .skip(perseInt(skip))
        .limit(perseInt(limit))
        .populate('orderItems')
        .sort('-createdAt')

        return res.json({
            data: order.map(order => order.toJSON({virtuals: true})),
            count
        })
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

module.exports = {
    store,
    index
}