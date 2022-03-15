const mongoose = require('mongoose')
const { model, Schema } = mongoose

let categorySchema = Schema({
    name: {
        type: String,
        minLength: [3, 'Panjang nama katagori minimal 3 huruf'],
        maxLength: [20, 'Panjang nama kategori minimal 20 huruf'],
        required: [true, 'Nama katagori harus diisi']
    }
})
module.exports = model('Categorys', categorySchema)