// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsByCategory } from "../features/products/Products-Slice";

// const useGetProductsByCategory = (category) => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.categoryProducts);
//   const loading = useSelector((state) => state.products.loading);

//   useEffect(() => {
//     if (category) {
//       dispatch(fetchProductsByCategory(category));
//     }
//   }, [category, dispatch]);

//   return { products, loading };
// };

// export default useGetProductsByCategory;
