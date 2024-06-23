import "./SectionBrochure.css";
import resturantFoodImg from "../assets/icons_assets/restauranfood.jpg";

function SectionBrochure(props) {
  return (
    <>
      <section className="section-brochure">
        <div className="sec-brochure-first">
          <h2>{props.title}</h2>
          <h3>{props.subTitle}</h3>
          <p>{props.description}</p>
          <button className="btn-sec-brouchure">Reserve a Table</button>
        </div>
        <div className="sec-brochure-second">
          <img src={resturantFoodImg} alt="" />
        </div>
      </section>
    </>
  );
}

export default SectionBrochure;
