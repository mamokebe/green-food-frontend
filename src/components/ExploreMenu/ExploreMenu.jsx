import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <div className="under-line-menu">
        <h2>Food Menu Category</h2>
        <div></div>
      </div>
      <p className="explore-menu-text">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nostrum
        eum repudiandae expedita assumenda nemo velit obcaecati facere nulla
        deserunt neque, consequatur quibusdam maxime quas placeat libero! Sint,
        error a? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
