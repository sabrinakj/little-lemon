import "./Testimonials.css";
import raitingIcon from "../assets/icons_assets/star_rate_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import Card from "./Card";

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
    dishDescription:"Great service, despite we were late we were able to have a great dinner.",
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
    dishDescription:"Not the best place I have ever been, but I appreciated the food variety.",
    image: raitingIcon,
  },
];

function Testimonials() {
  return (
    <section className="testimonials-specials">
      <div className="testimonials-online-menu">
        <h2 className="testimonials-card-titolo">Testimonials</h2>
      </div>
      <div className="testimonials-specials-cards">
        {cardsFood.map((cardFood) => (
          <Card className="testimonials-card"
            key={cardFood.id}
            imgURL={cardFood.image}
            dishPrice={cardFood.dishPrice}
            title={cardFood.dishName}
            delivery={cardFood.delivery}
            description={cardFood.dishDescription}
            isSmall={true}
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
