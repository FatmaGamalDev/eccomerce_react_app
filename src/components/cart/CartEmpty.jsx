import React from 'react'
import CartSvg from "../../Assets/download.svg";

function CartEmpty() {
  return (
    <div className='flex flex-col items-center justify-center p-8'>
        <img src={CartSvg} alt="Cart Icon" className="w-80 h-80" />
        <h1>Your Shopping Cart is Empty</h1>
        <button
        className="w-32 p-2 mt-12 text-white -translate-y-1/2 rounded-full left-20 top-2/3 bg-pink"
      >
        SHOP NOW
      </button>
    </div>
  )
}

export default CartEmpty