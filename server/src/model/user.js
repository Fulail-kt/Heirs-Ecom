import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        requried: true
    }, isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            },
            total: Number
        }
    ]
})

export default mongoose.model('user', userSchema)