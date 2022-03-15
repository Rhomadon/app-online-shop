const mongoose = require('mongoose')
const { model, Schema } = mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose)
const bcrypt = require('bcrypt')

let userSchema = Schema({
    full_name: {
        type: String,
        required: [true, 'Nama anda harus diisi'],
        maxlenght: [255, 'Nama anda terlalu panjang'],
        minlenght: [3, 'Nama anda terlalu pendek']
    },

    costumer_id: {
        type: Number
    },

    email: {
        type: String,
        required: [true, 'Email anda harus diisi'],
        maxlenght: [255, 'Email anda terlalu panjang']
    },

    password: {
        type: String,
        required: [true, 'Kata sandi anda harus diisi'],
        maxlenght: [255, 'Kata sandi anda terlalu panjang']
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    token: [String]
}, {timestamps: true})

userSchema.path('email').validate(function(value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return EMAIL_RE.test(value)
}), attr => `${attr.value} Harus berupa email yang valid` 

userSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('User').count({email: value})
        return !count
    } catch (err) {
        throw err
    }
}), attr => `${attr.value} Email anda sudah terdaftar` 

const HASH_ROUND = 10
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

userSchema.plugin(AutoIncrement, {inc_field: 'costomer_id'})

module.exports = model('User', userSchema)