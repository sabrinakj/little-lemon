import "./SectionBrochure.css";
import resturantFoodImg from "../assets/icons_assets/restauranfood.jpg";

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
    </>
  );
}

export default SectionBrochure;
