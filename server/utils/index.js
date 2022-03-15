const {Ability, AbilityBuilder} = require('@casl/ability')

function getToken(req){
    let token = 
        req.headers.authorization 
        ? req.headers.authorization.replace(`Bearer `, '') : null

    return token && token.length ? token : null
}

// Policies

const policies = {
    guest(user, {can}) {
        can('read', 'Products')
    },

    user(user, {can}) {
        can('view', 'Order')
        can('create', 'Order')
        can('read', 'Order', {user_id: user._id})
        can('update', 'User', {_id: user._id})
        can('read', 'Cart', {user_id: user._id})
        can('update', 'Cart', {user_id: user._id})
        can('view', 'DeliveryAddress')
        can('create', 'DeliveryAddress', {user_id: user._id})
        can('update', 'DeliveryAddress', {user_id: user._id})
        can('delete', 'DeliveryAddress', {user_id: user._id})
        can('read', 'DeliveryAddress', {user_id: user._id})
    },

    admin(user, {can}) {
        can('manage', 'All'),
        can('delete', 'Products'),
        can('update', 'Products'),
        can('create', 'Products')
    }
}

const policyFor = user => {
    let builder = new AbilityBuilder()
    if(user && typeof policies[user.role] === 'function') {
        policies[user.role](user, builder)
    } else {
        policies['guest'](user, builder)
    }
    return new Ability(builder.rules)
}

module.exports = {
    getToken,
    policyFor
}