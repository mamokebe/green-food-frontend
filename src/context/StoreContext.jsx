import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

// //addition to be add here custom hook
// 1. delete expeort from #.4
// 2. add import useContext
// 3. add this function
// export const useCustom = ()=>{
//   return useContext (StoreContext)
// }
//usage in components
//  in  each component use this custom hook like below
//1.--import {useCustom}
//2.---const {}=useCustom()

//managing data at storeContext()
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  //backend url local
  // const url = "http://localhost:4400";

  //backend url deployed
  const url = "https://green-food-backend.onrender.com";

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  //add to cart logic
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    //add or update item in cart using api post method
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };
  //remove from cart logic
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  //this were used to check items in the cart when items added
  //   useEffect(() => {
  //     console.log(cartItems);
  //   }, [cartItems]);

  //create variable that return total cart amount of items
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  //getting data (food list) from database using axios
  //  created   get method API in backend
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      //getting token in variable (update token within data) from local storage & whenever the page reload, use it token (user not logged out)
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        //whenever page loaded user cart data displayed
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  //to access variables value in any component using this useContext
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
