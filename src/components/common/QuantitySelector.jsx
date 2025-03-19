import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { updateQuantity } from "../../rtk/slices/Cart-Slice";
import { useDispatch } from "react-redux";

function QuantitySelector({ quantity, setQuantity, selectedProduct }) {
  function increaseItem() {
    if (quantity < selectedProduct.stock) {
      setQuantity( quantity + 1)
    }
  }
  function decreaseItem() {
    if (quantity > 1) {
      setQuantity(quantity - 1 )
    }
  }

  return (
    <div className="flex items-center ">
      <button className="text-3xl circle-btn"
       onClick={increaseItem}>
        <FaPlus className="text-sm" />
      </button>
      <input
        type="number"
        value={quantity}
        min="1"
        max={selectedProduct.stock}
        className="w-12 text-lg text-center outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        onClick={decreaseItem}
        className="text-3xl text-center circle-btn"
      >
        <FaMinus className="text-sm" />
      </button>
    </div>
  );
}

export default QuantitySelector;
