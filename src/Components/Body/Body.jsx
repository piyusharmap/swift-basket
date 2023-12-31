import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import ProductCard from "./ProductCard"
import ProductCardShimmer from "./ProductCardShimmer"
import { filterData } from "../../Utils/utils"
import { ALL_PRODUCTS_URL } from "../../constant"

function Body(){
   const [allProducts, setAllProducts] = useState([])
   const [filteredProducts, setFilteredProducts] = useState([])
   const [errorMsg, setErrorMsg] = useState("")
   const [searchText, setSearchText] = useState("")
   const [selectedCategory, setSelectedCategory] = useState("")

   useEffect(() => {
      getAllProducts()
   }, [])

   const getAllProducts = async() => {
      try {
         const data = await fetch(ALL_PRODUCTS_URL)
         const json = await data.json()

         setAllProducts(json)
         setFilteredProducts(json)
      } catch (error) {
         console.log(error)
         setAllProducts([])
         setFilteredProducts([])
      }
   }

   const searchProduct = (allProducts, targetProduct, targetCategory) => {
      if(targetProduct != ""){
         const data = filterData(allProducts, targetProduct, targetCategory)
         setFilteredProducts(data)
         setErrorMsg("")

         if(data.length === 0){
            setFilteredProducts(allProducts)
            setErrorMsg("No Matching Products")
         }
      }
      else{
         setFilteredProducts(allProducts)
         setErrorMsg("")
      }
   }

   if(!filteredProducts || filteredProducts.length === 0) return <ProductCardShimmer />

   return(
      <div> 
         <div className="py-4 px-[10%] font-secondary flex flex-col sm:flex-row justify-center items-center gap-2">
            <input 
               type="text" 
               placeholder="Search products..." 
               value={searchText}
               onChange={(e) => {
                  setSearchText(e.target.value)
                  searchProduct(allProducts, searchText, selectedCategory)
               }}
               className="w-full sm:w-1/2 py-2 px-4 border-[1px] border-primaryRed/80 rounded-lg focus:outline-none"
            />

            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
               <button 
                  className="w-full sm:w-1/2 p-2 bg-primaryBlack text-lg text-secondaryWhite rounded-lg hover:bg-secondaryWhite hover:text-primaryBlack" 
                  onClick={e => searchProduct(allProducts, searchText, selectedCategory)}
               >
                  Search
               </button>

               <select 
                  value={selectedCategory} 
                  id="category" 
                  name="category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-1/2 p-2 rounded-lg border-[1px] border-primaryBlack focus:border-primaryRed"
               >
                  <option value="">All</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
               </select>
            </div>
         </div>

         {errorMsg === "" ? null : (
          <h1 className="p-2 font-primary text-2xl text-primaryRed text-center">{errorMsg}</h1>
         )}

         <div className="w-full p-2 font-secondary text-center">
            <p className="p-2 font-primary text-2xl opacity-80">Popular Products</p>
            <p className="p-2 text-3xl">Grab Yours Today!!</p>
         </div>

         <div className="py-8 px-[10%] flex flex-wrap justify-around items-start">
            {  
               filteredProducts.map(product => {
                  return(
                     <Link key={product?.id} to={`/products/${product?.id}`} className="w-full sm:w-1/2 md:w-2/6">
                        <ProductCard product={product} />
                     </Link>
                  )
               })
            }
         </div>
      </div>
   )
}

export default Body