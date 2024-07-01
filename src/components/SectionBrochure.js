import "./SectionBrochure.css";
import resturantFoodImg from "../assets/icons_assets/restauranfood.jpg";

function SectionBrochure(props) {
  return (
    <>
      <section className="section-brochure">
        <div className="wrapped-section">
          <div className="sec-brochure-first">
            <h2 className="title-section-brochure">{props.title}</h2>
            <h3>{props.subTitle}</h3>
            <p>{props.description}</p>
            <button className="btn-sec-brouchure">Reserve a Table</button>
          </div>
          <div className="sec-brochure-second">
            <img src={resturantFoodImg} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default SectionBrochure;
