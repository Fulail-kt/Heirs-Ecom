import express from 'express'
import userRoutes  from './routes/userRoute.js'
import adminRoutes from './routes/adminRoute.js'
import Database from './config/Db.js'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({ origin:process.env.FRONTEND_URL}));
app.use('/api/v1',userRoutes)
app.use('/api/v1/admin',adminRoutes)

app.listen(3004,()=>{
    Database()
    console.log("node server running")
})