// import React, { Children } from "react";
import "./SectionBrochure.css";
import resturantFoodImg from "../assets/icons_assets/restauranfood.jpg";
import { Fragment } from "react";
// import Card from "./Card";
// import greekSaladImg from "../assets/icons_assets/greek salad.jpg";
// import lemonDesertImg from "../assets/icons_assets/lemon dessert.jpg";


// const cardsFood = [
//   {
//     id: 0,
//     dishName: "Greek salad",
//     dishPrice: "$ 10.00",
//     dishDescription: "The famous greek salad of crispy lettuce, peppers, ollives and our Chicago style feta cheese, garnished with crunchy garlic and rosmary croutons.",
//     delivery: "Order a delivey",
//     image: greekSaladImg
//   },
//   {
//     id: 1,
//     dishName: "Bruschetta",
//     dishPrice: "$ 12.00",
//     dishDescription: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
//     delivery: "Order a delivey",
//     image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//   },
//   {
//     id: 2,
//     dishName: "Lemon desert",
//     dishPrice: "$ 11.00",
//     dishDescription: "Tis comes straight from grama’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
//     delivery: "Order a delivey",
//     image: lemonDesertImg
//   }
// ];

function SectionBrochure(props) {
  return (
    <>
      <section className="section-brochure">
        <div>
          <h2>{props.title}</h2>
          <h3>{props.subTitle}</h3>
          <p>{props.description}</p>
          <button>Reserve a Table</button>
        </div>
        <div>
          <img src={resturantFoodImg} alt="" />
        </div>
      </section>
      {/* {
        cardsFood.map( (cardFood) => (
          <Card
          key={cardFood.id}
          imgURL={cardFood.image}
          title={cardFood.dishName}
          description={cardFood.dishDescription}
          />
        ))
      } */}
    </>
  );
}

export default SectionBrochure;
