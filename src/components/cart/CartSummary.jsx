import React from 'react'

function CartSummary ({cartTotal}) {
  return (
    <div className="w-[90%] flex flex-col gap-4 bg-white my-4 border-y-[1px] border-black p-4">
    <h1 className="text-xl font-bold uppercase">order summary</h1>
    <div className="flex items-center justify-between">
      <h4 className="font-bold">Total </h4>
      <span>{Number(cartTotal || 0).toFixed(2)}$</span>
    </div>
    <p className="text-center">Ships in 1-2 business days</p>
  </div>
 )
}

export default CartSummary 