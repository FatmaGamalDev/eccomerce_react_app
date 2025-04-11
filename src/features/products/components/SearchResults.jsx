import React from 'react'
import { useSelector } from 'react-redux'
import ProductsList from './ProductsList'
import SearchEmpty from './SearchEmpty'

function SearchResults() {
const SearchResults= useSelector((state)=> state.products.searchResult||[])
const searchQuery= useSelector((state)=> state.products.searchQuery||" ")

return (
SearchResults.length>0 ?
   <div>
     <h1 className=" my-8 px-[24px]  text-2xl text-gray-600  font-semibold">Search Results "{searchQuery}"</h1>
     <ProductsList products={SearchResults} productsPerPage ={12} />
   </div>
  :
  <SearchEmpty/>
)
}
export default SearchResults