import React from 'react'
import { useSelector } from 'react-redux'
import ProductsList from '../features/products/components/ProductsList'
import SearchEmpty from '../components/common/SearchEmpty'

function SearchResults() {
const SearchResults= useSelector((state)=> state.products.searchResult)
console.log(SearchResults)
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