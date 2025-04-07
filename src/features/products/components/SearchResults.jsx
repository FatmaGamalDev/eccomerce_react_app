import React from 'react'
import { useSelector } from 'react-redux'
import ProductsList from './ProductsList'
import SearchEmpty from './SearchEmpty'

function SearchResults() {
const SearchResults= useSelector((state)=> state.products.searchResult||[])
return (
SearchResults.length>0 ?
   <div>
     <ProductsList products={SearchResults} />
   </div>
  :
  <SearchEmpty/>
)
}

export default SearchResults