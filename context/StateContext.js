import { createContext ,useContext,useState} from "react"
import { toast } from "react-hot-toast"


const Context =createContext()
export const StateContext=({children})=>{
    const [showCart,setShowCart]=useState(false)
    const [cartItems,setCartItems]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const [totalQuantities,setTotalQuantities]=useState(0)
    const [qty,setqty]=useState(1)

    const incQty=()=>{
       setqty((prevQty)=>prevQty+1)
    }

    const decQty=()=>{
        setqty((prevQty)=>{
            if(prevQty-1<1) return 1
            return prevQty - 1
        })
    }

    const onAdd = (product, quantity) => {
      const newCartItems=[...cartItems];
    const checkProductInCart = newCartItems?.find((item) => item?._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      checkProductInCart.quantity+=quantity
      setCartItems(newCartItems)
      // const updatedCartItems = cartItems?.map((cartProduct) => {
      //     if(cartProduct?._id === product._id) return {
      //         ...cartProduct,
      //         quantity: cartProduct.quantity + quantity
      //       }
      //     else
      //       return{
      //         ...cartProduct
      //       }
      //     })    
      // console.log(cartItems)
      // setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems,{...product}])
    }
        toast.success(`${qty}${product.name} added to cart`)
        
    }
    
    let foundProduct;
    let index;
const onRemove=(product)=>{
    foundProduct=cartItems.find((item)=>(item._id===product._id))
    const newCartItems=cartItems.filter((item)=>item!==foundProduct)
    setCartItems(newCartItems)
    setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.quantity*foundProduct.price)
    setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities-foundProduct.quantity)
}
const toggleCartItemQuanitity = (id, value) => {
   
    const newCartItems = cartItems
    foundProduct = newCartItems.find((item) => item._id === id)
    

    if(value === 'inc') {
        foundProduct.quantity+=1
      setCartItems([...newCartItems])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity-=1
        setCartItems([...newCartItems])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }


    return(
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            setShowCart,
            onAdd,
            onRemove,
            toggleCartItemQuanitity,
            setCartItems,
            setTotalPrice,
            setTotalQuantities 

        }}>
            {children}
        </Context.Provider>

)
    
}

export const useStateContext=()=>useContext(Context);
