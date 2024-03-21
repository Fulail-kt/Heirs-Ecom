import React from 'react'
import { Link } from 'react-router-dom'


function Product(props) {
  const {_id,title,price,images} = props.data

  return (
    <div key={_id} className='product border-4 bg-white flex'>
      <Link to={`/product/${_id}`}>
       <div className='h-2/3'>  
         <img src={images[0]} alt={title} />
       </div>
      </Link>
      <div className='description '>
        <p><b>{title}</b></p>
        <p> ₹ {price}</p>
      </div>
    </div>
  )
}

export default Product
