import { HashRouter as Router} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import useMergeGuestCart from "./features/cart/hooks/useMergeGuestCart";
import useMergeGuestWishlist from "./features/wishlist/hooks/useMergeGuestWishlist";
import useAuthSession from "./hooks/useAuthSession";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useAuthSession();
  useMergeGuestCart();
  useMergeGuestWishlist();

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
