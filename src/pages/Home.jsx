import React from 'react'
import Slider from '../components/ui/Slider'
import ProductsList from '../components/home/ProductsList'
import Categories from '../components/home/Categories'

function Home() {
  return (
    <>
    <Slider/>
    <Categories/>
    <ProductsList/>
    </>
  )
}

export default Home