const mongoose = require('mongoose')
const { model, Schema } = mongoose

const OrderItemSchema = Schema({
    name: {
        type: String,
        minlenght: [3, 'Nama makanan terlalu pendek'],
        required: [true, 'Nama makanan harus diisi']
    },
    price: {
        type: Number,
        required: [true, 'Harga harus diisi']
    },
    qty: {
        type: Number,
        min: [1, 'Jumlah minimal 1'],
        required: [true, 'Jumlah harus diisi']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
})

module.exports = model('OrderItem', OrderItemSchema)