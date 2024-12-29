import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  // functions from context
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  //create state variable to store delivery information and initialized with object ...
  //and will get from input field
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  //create onchangeHandler function which will save data using state variable
  const onChangeHandler = (event) => {
    //using this event extract name and value
    const name = event.target.name;
    const value = event.target.value;
    //calling setter data set function and pass prev. data, change prev. data and update the latest value that we will get from event
    setData((data) => ({ ...data, [name]: value }));
  };
  //proceed to payment session
  const placeOrder = async (event) => {
    //to avoid default reloading page
    event.preventDefault();
    //destructure all orders data created in the api and
    //call api
    let orderItems = []; //add cart items related data
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    //create/generate  order data variable which is object
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 3,
    };
    //send order data from api
    //calling api
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    //after calling api check the response
    if (response.data.success) {
      const { session_url } = response.data;
      //sending user on the session url
      window.location.replace(session_url);
    } else {
      alert("There is some error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.emailName}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${Math.round(getTotalCartAmount() * 100) / 100}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>
                ${Math.round(getTotalCartAmount() * 100) / 100 === 0 ? 0 : 3}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                $
                {Math.round(getTotalCartAmount() * 100) / 100 === 0
                  ? 0
                  : Math.round(getTotalCartAmount() * 100) / 100 + 3}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
