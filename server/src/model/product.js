import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  title: String,
  color: String,
  price: Number,
  stock: Number,
  description: String,
  images: [String],
  deleted: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('products', productSchema)