import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <h2>About us</h2>
      <div className="under-line-about"></div>
      <p className="about-us">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
        porro voluptas excepturi sequi corrupti ad, optio aperiam praesentium
        consequuntur, quaerat debitis tenetur dolore ipsum quo sunt cumque
        quibusdam eius inventore. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Doloremque maxime facere error, molestiae eaque
        adipisci iure repellat fugit sequi dicta aliquid ut nobis dolorem est
        incidunt quo! Quas, magnam velit.
      </p>

      <h2>Download Green-Food App here</h2>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;
