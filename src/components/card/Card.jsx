import React from 'react'
import "./Card.css"
const Card = ({address,amount}) => {
  return (
    <div className='card'>
          <p className="add">Address:{address.slice(0,5)}...{address.slice(address.length-7,address.length)}</p> 
          <p className='amount'> Amount:{ amount}ETH</p>
    </div>
  )
}

export default Card
