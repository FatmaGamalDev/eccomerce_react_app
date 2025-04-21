import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

function QuantitySelector({ quantity, setQuantity, selectedProduct }) {
  function increaseItem() {
    if (quantity < selectedProduct.stock) {
      setQuantity(quantity + 1);
    }
  }
  function decreaseItem() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  return (
    <div className="flex items-center ">
      <button
        className="p-[9px] text-3xl text-center border border-gray-400 rounded-md"
        onClick={increaseItem}
      >
        <FaPlus className="text-sm" />
      </button>
      <input
        type="number"
        value={quantity}
        min="1"
        max={selectedProduct.stock}
        className="w-10 text-md text-center outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        onClick={decreaseItem}
        className="p-[9px] text-3xl text-center border border-gray-400 rounded-md "
      >
        <FaMinus className="text-sm " />
      </button>
    </div>
  );
}

export default QuantitySelector;
