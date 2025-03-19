import React from 'react'
import { useSelector } from 'react-redux'
import ProductsList from '../components/home/ProductsList'


function SearchResults() {
const SearchResults= useSelector((state)=> state.products.searchResult)
console.log(SearchResults)
  return (
   <div>
     <div>SearchResults</div>
     <ProductsList products={SearchResults} />
   </div>
  )
}

export default SearchResults