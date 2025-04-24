import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../../products/Products-Slice";
import { fetchCategories } from "../CategoriesSlice";
import Container from "../../../components/ui/Container";
import CategoryCard from "../components/CategoryCard";
import CategoryCarousel from "../components/CategoryCarousel";
import useGetProductsByCategory from "../../../hooks/useGetProductsByCategory";

function Categories({ setCurrentPage }) {
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


function getProductsByCategory(categoryName) {
  dispatch(setActiveCategory(categoryName));
  setCurrentPage(1); 
}
  const filteredCategories = categories?.filter(
    (category) =>
      ![
        "groceries",
        "vehicle",
        "motorcycle",
        "mens-watches",
        "mens-shoes",
        "mens-shirts",
        "smartphones",
        "sports-accessories",
      ].includes(category)
  );
  return (
    <Container size="xl">
      <div className="mt-12 mb-8 ">
        {/* categories heading */}
        <div className="flex items-center justify-between ">
          <div>
            <h6 className="text-xl font-semibold text-pink">Top Categories</h6>
            <h1 className="text-3xl font-bold">Choose by Top Category</h1>
          </div>
        </div>

        {/* categories Carousel */}
        <CategoryCarousel>
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              getProductsByCategory={getProductsByCategory}
            />
          ))}
        </CategoryCarousel>
      </div>
    </Container>
  );
}

export default Categories;
