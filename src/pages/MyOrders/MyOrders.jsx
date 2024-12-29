import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  //call api for token and url
  const { url, token } = useContext(StoreContext);

  //fetch all users data and save it in one state variable by calling api
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };
  //call this function whenever the data loaded
  useEffect(() => {
    //check if token is available and run the function
    if (token) {
      fetchOrders();
    }
  }, [token]);
  //suppose user login or logout on the webpage so that we can execute this function again ([token])//when ever the token will be updated this  function will be executed
  return (
    <div className="my-orders">
      <h2>My orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "*" + item.quantity;
                  } else {
                    return item.name + "*" + item.quantity + "," + " ";
                  }
                })}
              </p>
              <p>Items: {order.items.length}</p>
              <p>Total price: ${order.amount}</p>
              <p>
                <span> &#x25cf; </span>

                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
