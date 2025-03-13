import "./SectionSpecials.css";
import greekSaladImg from "../assets/icons_assets/greek salad-460x307.png";
import lemonDesertImg from "../assets/icons_assets/lemon dessert.jpg";
import bruschettaImg from "../assets/icons_assets/bruschetta.png";
import Card from "./Card";
import { Link } from "react-router-dom";

const cardsFood = [
  {
    id: 0,
    dishName: "Greek salad",
    dishPrice: "$ 10.00",
    dishDescription:
      "The famous greek salad of crispy lettuce, peppers, ollives and our Chicago style feta cheese, garnished with crunchy garlic and rosmary croutons.",
    delivery: "Order a delivey",
    image: greekSaladImg,
  },
  {
    id: 1,
    dishName: "Bruschetta",
    dishPrice: "$ 12.00",
    dishDescription:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    delivery: "Order a delivey",
    image:
      bruschettaImg,
  },
  {
    id: 2,
    dishName: "Lemon desert",
    dishPrice: "$ 11.00",
    dishDescription:
      "This comes straight from grama’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    delivery: "Order a delivey",
    image: lemonDesertImg,
  },
];

function SectionSpecials() {
  return (
    <section className="section-specials">
      <div className="online-menu">
        <h2 className="card-titolo">This weeks special!</h2>
        <Link to="/menu" className="custom-link">
          <button className="btn-specials">Online Menu</button>
        </Link>
      </div>

      <div className="specials-cards">
        {cardsFood.map((cardFood) => (
          <Card
            key={cardFood.id}
            imgURL={cardFood.image}
            dishPrice={cardFood.dishPrice}
            title={cardFood.dishName}
            delivery={cardFood.delivery}
            description={cardFood.dishDescription}
            isSmall={false}
          />
        ))}
        <Link to="/menu" className="custom-link-mobile">
          <button className="btn-specials">Online Menu</button>
        </Link>
      </div>
    </section>
  );
}

export default SectionSpecials;
