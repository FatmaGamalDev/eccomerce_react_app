import React from 'react'
import Slider from '../components/home/Slider'
import ProductsList from '../components/home/ProductsList'
import Categories from '../components/home/Categories'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
} from "../rtk/slices/Products-Slice";

function Home() {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  return (
    <>
    <Slider/>
    <Categories/>
    <ProductsList products={products}/>
    </>
  )
}

export default Home