const { model, Schema } = require('mongoose')

const deliveryAddressSchema = Schema({
    name: {
        type: String,
        maxlengh: [255, 'Nama terlalu panjang'],
        required: [true, 'Nama harus diisi']
    },
    kelurahan: {
        type: String,
        maxlengh: [255, 'Nama kelurahan terlalu panjang'],
        required: [true, 'Nama kelurahan harus diisi']
    },
    kecamatan: {
        type: String,
        maxlengh: [255, 'Nama kecamatan terlalu panjang'],
        required: [true, 'Nama kecamatan harus diisi']
    },
    kabupaten: {
        type: String,
        maxlengh: [255, 'Nama kabupaten terlalu panjang'],
        required: [true, 'Nama kabupaten harus diisi']
    },
    provinsi: {
        type: String,
        maxlengh: [255, 'Nama provinsi terlalu panjang'],
        required: [true, 'Nama provinsi harus diisi']
    },
    detail: {
        type: String,
        maxlengh: [255, 'Detail terlalu panjang'],
        required: [true, 'Detail harus diisi']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true }) 

module.exports = model('DeliveryAddress', deliveryAddressSchema)