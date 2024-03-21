import React, { useEffect, useState } from 'react'
import './shop.css'
import { PRODUCTS } from '../../products'
import Product from './product'
import api from '../../services/api'

function Shop() {

  const[products,setProducts]=useState([])

  const fetchProduct=async()=>{
    try {
      const res=await api.get('/allProducts')

      setProducts(res?.data?.products)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchProduct()
  },[])
  return (
    <div className='shop '>
      <div className='shopTitle'>
        <h1>Heirs</h1>
      </div>
      <div className='products'>
        {products.map((product, index) => {
          return (<Product key={index} data={product} />)
        })}
      </div>
    </div>
  )

}

export default Shop
