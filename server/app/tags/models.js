const mongoose = require('mongoose')
const { model, Schema } = mongoose

let tagSchema = Schema({
    name: {
        type: String,
        minLength: [3, 'Panjang nama tag minimal 3 huruf'],
        maxLength: [20, 'Panjang nama tag minimal 20 huruf'],
        required: [true, 'Nama tag harus diisi']
    }
})
module.exports = model('Tags', tagSchema)