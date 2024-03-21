import express from "express";
 const route = express.Router()
 import userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/middlewares.js";






route.post('/create', userController.create);
route.post('/login', userController.login);
route.get('/allProducts', userController.getAllProducts);
route.get('/getProduct/:id', userController.getProduct);
route.get('/getUser/:id', userController.getUser);
route.get('/getAllUser', userController.getAllUsers);
route.post('/add-to-cart/:id',authMiddleware, userController.addToCart);
route.patch('/updateCart/:id',authMiddleware, userController.updateCart);
route.delete('/delete-from-cart/:id',authMiddleware, userController.deleteFromCart);









export default route