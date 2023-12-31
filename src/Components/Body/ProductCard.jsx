import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag, faStar } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"

import { addProduct } from "../../Store/Slices/CartSlice"
import productPlaceholder from "../../assets/product.webp"

function ProductCard({product}){
   const dispatch = useDispatch()

   const handleAddProduct = (value) => {
      dispatch(addProduct(value))
   } 

   return(
      <div className="m-2 p-4 font-primary flex flex-col justify-center items-center gap-2 border-[1px] border-primaryBlack/20 rounded-xl transition-all hover:shadow-xl">
         <div className="w-full text-base sm:text-lg flex justify-between items-center">
            <p>
               <FontAwesomeIcon className="text-lg text-orange-500" icon={faStar} />
               <span>{`${product?.rating?.rate} (${product?.rating?.count})`}</span>
            </p>

            <button onClick={() => handleAddProduct(product)}>
               <FontAwesomeIcon className="text-lg hover:opacity-80" icon={faShoppingBag} />
            </button>
         </div>

         <img className="p-2 h-[200px] w-[200px] object-contain" alt="Product Banner" src={product?.image ? product?.image : productPlaceholder}></img>

         <p className="w-full text-xs sm:text-sm opacity-80 uppercase">{product?.category}</p>
         <h1 className="h-6 sm:h-8 text-base sm:text-lg w-full overflow-y-hidden">{product?.title}</h1>

         <p className="w-full font-secondary text-base sm:text-2xl text-primaryRed">${product?.price}</p>
      </div>

   )
}

export default ProductCard