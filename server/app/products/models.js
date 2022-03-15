const mongoose = require('mongoose')
const { model, Schema } = mongoose

const productSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Panjang nama makanan minimal 3 huruf'],
        required: [true, 'Nama makanan harus diisi']
    },
    description: {
        type: String,
        maxlength: [1000, 'Panjang deskripsi makanan maksimal 1000 huruf']
    },
    price: {
        type: Number,
        default: 0
    },

    image_url: String,

    category: {
        type: Schema.Types.ObjectId,
        ref:  'Categorys'
    },

    tag: {
        type: Schema.Types.ObjectId,
        ref:  'Tags'
    }

}, { timestamps: true }) 

module.exports = model('Products', productSchema)