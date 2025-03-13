import "./Testimonials.css";
import raitingIcon from "../assets/icons_assets/star_rate_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import Card from "./Card";
import React from "react";

const cardsFood = [
  {
    id: 0,
    dishName: "Rebecca Jones",
    dishDescription:"Awesome place to enjoy delicius food.",
    image: raitingIcon,
  },
  {
    id: 1,
    dishName: "Mark Red",
    dishDescription:"Great service, we were late but we had a great dinner.",
    image: raitingIcon,
  },
  {
    id: 2,
    dishName: "Jhon Doe",
    dishDescription:"I really enjoy the meals, and I reccomend it to every one.",
    image: raitingIcon,
  },
  {
    id: 3,
    dishName: "Sarah Simpson",
    dishDescription:"Not the best place I have ever been, but great food variety.",
    image: raitingIcon,
  },
];

function Testimonials() {
  return (
    <section className="testimonials-container">
      <div className="testimonials-online-menu">
        <h2 className="testimonials-card-titolo">Testimonials</h2>
      </div>
      <div className="testimonials-container-cards">
        {cardsFood.reduce((result, cardFood, index) => {
          if (index % 2 === 0) {
            result.push([]);
          }
          result[result.length - 1].push(cardFood);
          return result;
        }, []).map((group, groupIndex) => (
          <div className="card-pair-block" key={`group-${groupIndex}`}>
            {group.map((cardFood) => (
              <Card
                key={cardFood.id}
                className="testimonials-card"
                imgURL={cardFood.image}
                dishPrice={cardFood.dishPrice}
                title={cardFood.dishName}
                delivery={cardFood.delivery}
                description={cardFood.dishDescription}
                isSmall={true}
              />
            ))}
          </div>
        ))}

      </div>
    </section>
  );
}

export default Testimonials;
