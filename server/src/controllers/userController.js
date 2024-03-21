import product from "../model/product.js";
import Product from "../model/product.js";
import User from "../model/user.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";


// login 
const login = async (req, res) => {
    try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        if (req.body.password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ success: true, message: 'Successfully logged in', user: user, token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
};

const create = async (req, res) => {
    try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const { name, email, password, phone, confirm } = req.body

        if (!emailRegex.test(email)) {

            return res.status(400).json({ success: false, message: 'invalid email' })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password atleast 6 digits needed' })
        }

        if (confirm !== password) {
            return res.status(400).json({ success: false, message: 'Password is not matching' })
        }

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({ success: false, message: 'Email Already exist' })

        }
        console.log(req.body)

        const hash = bcrypt.hashSync(password, 10)

        const user = new User({ name, password: hash, email, phone, });

        await user.save();

        return res.status(200).json({ success: true, message: 'successfully created' })

    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false, message: 'server error' })
    }
};


const addToCart = async (req, res) => {
    try {

        const  id = req.params.id
        const  userId  = req.user.id

        if (!id || !userId) {

            return res.status(400).json({ success: false, message: 'invalid id' })
        }

        const product = await Product.findById(id)

        if (!product) {
            return res.status(400).json({ success: false, message: 'product not found' })
        }

        const user = await User.findById({ _id: userId })

        if (!user.cart) {
            user.cart = [];
        }

        const productIndex = user.cart.findIndex((item) => item.product.toString() === id);

        if (productIndex !== -1) {
            const cartItem = user.cart[productIndex];
            if (product.stock > cartItem.quantity) {
                cartItem.quantity++;
                await user.save();
                return res.status(200).json({ success: true, message: 'Product added again' });
            }
            return res.status(200).json({ success: true, message: 'Product quantity exceeded' });
        }
        
        user.cart.push({product:product._id,quantity:1,price:product.price,total:product.price});
        await user.save();

        return res.status(200).json({ success: true, message: 'Product add to cart' })

    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ success: false, message: 'server error', })
    }
};


const updateCart = async () => {
    try {
        const { id } = req.params
        const { userId } = req.user.id
        const { action } = req.body
        if (!id || !userId) {
            return res.status(400).json({ success: false, message: 'value is missing' })
        }
        const user = await User.findById({ id: userId })

        if (!user) {
            return res.status(400).json({ success: false, message: 'user not found' })
        }

        const product = await Product.findById(id)

        if (!product) {
            return res.status(400).json({ success: false, message: 'Product not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === id);

        if (cartItemIndex === -1) {
            return res.status(404).json({ success: false, error: 'Product not found in cart' });
        }

        const cartItem = user.cart[cartItemIndex];

        if (action === 'increment' && cartItem.quantity < product.stock) {
            cartItem.quantity++;
        } else if (action === 'decrement' && cartItem.quantity > 1) {
            cartItem.quantity--;
        }

        cartItem.total = parseInt(cartItem.quantity * cartItem.price);

        await user.save();

        return res.status(200).json({ success: true, message: 'Cart updated successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'server Error' })
    }
}

const deleteFromCart = async () => {

    try {

        const { id } = req.params
        const { userId } = req.user.id

        if (!id || !userId) {
            return res.status(400).json({ success: false, message: 'value is missing' })
        }
        const user = await User.findById({ _id: userId })

        if (!user) {
            return res.status(400).json({ success: false, message: 'user not found' })
        }

        const product = await Product.findById(id)

        if (!product) {
            return res.status(400).json({ success: false, message: 'Product not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === id);

        if (cartItemIndex === -1) {
            return res.status(404).json({ success: false, error: 'Product not found in cart' });
        }

        user.cart.splice(cartItemIndex, 1);

        await user.save();

        return res.status(200).json({ success: true, message: 'Product removed from cart' });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'server Error' })
    }

}

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();

        if (!allProducts || allProducts.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        return res.status(200).json({ success: true, products: allProducts });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getProduct=async(req,res)=>{
    try {
        const {id}=req.params
    
        if(!id){
            return res.status(400).json({success:false,message:'product Id is missing'})
        }
    
        const product = await Product.findById(id)
    
        if(!product){
            return res.status(400).json({success:false,message:'product not found'})
        }
    
        res.status(200).json({success:true,message:'product retrived',product})
    } catch (error) {
        
      return res.status(500).json({success:false,message:'Server Error'})
    }

}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }

        return res.status(200).json({ success: true, users: allUsers });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: 'User ID is missing' });
        }
        const user = await User.findById(id).populate('cart.product');
        console.log(user,"ddd")
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, message: 'User retrieved', user });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};



export default {
    login, create, addToCart, deleteFromCart, getAllProducts, updateCart,getProduct,getUser,getAllUsers
}