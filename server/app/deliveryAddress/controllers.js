const DeliveryAddress = require('./models')

const store = async (req, res, next) => {
    try {
        let payload = req.body
        let user = req.user
        let address = new DeliveryAddress({...payload, user: user_id})
        await address.save()

        return res.json(address)
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
    store
}