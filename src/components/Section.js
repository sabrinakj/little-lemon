import React from "react";
import "./Section.css";
import resturantFoodImg from '/Users/sabrina/appDev/reactApps/little-lemon/src/assets/icons_assets/restauranfood.jpg'

function Section(props) {
  return (
    <section>
      <div>
        <h2>{props.title}</h2>
      <h3>{props.subTitle}</h3>
      <p>{props.description}</p>
      <button>Reserve a Table</button>
      </div>
      <div>
        <img src={resturantFoodImg} alt=""/>
      </div>
    </section>
  );
}

export default Section;
