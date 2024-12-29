import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas neque
            officiis, nulla asperiores minus assumenda expedita aliquam dolorem
          </p>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>Delivery</li>
            <li>Terms of Service</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>Contact Info</h2>
          <ul>
            <li>+1212-459-9999</li>
            <li>Contact@food.com</li>
          </ul>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024@ GREENFood.com - All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
