const mongoose = require('mongoose')
const { model, Schema } = mongoose

const cartItemSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama makanan minimal 3 huruf'],
        required: [true, 'Nama harus di isi'] 
    },
    qty: {
        type: Number,
        min: [1, 'Minimal 1 barang'],
        required: [true, 'QTY harus di isi'] 
    },
    price: {
        type: Number,
        default: 0 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products' 
    },
})

module.exports = model('CartItem', cartItemSchema)