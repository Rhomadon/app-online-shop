const mongoose = require('mongoose')
const { model, Schema } = mongoose

const invoiceSchema = Schema({
    sub_total: {
        type: String,
        required: [true, 'Jumlah harus diisi']
    },
    delivery_fee: {
        type: Number,
        required: [true, 'Ongkir harus diisi']
    },
    delivery_address: {
        provinsi: { type: String, required: [true, 'Provinsi harus diisi']},
        kabupaten: { type: String, required: [true, 'kabupaten harus diisi']},
        kecamatan: { type: String, required: [true, 'kecamatan harus diisi']},
        kelurahan: { type: String, required: [true, 'kelurahan harus diisi']},
        detail: { type: String }
    },
    total: {
        type: Number,
        required: [true, 'Total harus diisi']
    },
    Payment_status: {
        type: String,
        enum: ['waiting_payment', 'paid'],
        default: 'waiting_payment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, {timestamps: true})

module.exports = model('Invoice', invoiceSchema)