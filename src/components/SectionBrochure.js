import "./SectionBrochure.css";
import resturantFoodImg from "../assets/icons_assets/restauranfood-171x258.png";
import { Link } from "react-router-dom";

function SectionBrochure(props) {
  return (
    <>
      <section className="section-brochure">
        <div className="wrapped-section">
          <div className="sec-brochure-text">
            <h2 className="title-section-brochure">{props.title}</h2>
            <h3 className="h3-section-brochure">{props.subTitle}</h3>
            <p>{props.description}</p>
            <Link to="/reservation" className="custom-link">
              <button className="btn-sec-brouchure">Reserve a Table</button>
            </Link>
          </div>
          <div className="sec-brochure-image">
            <img src={resturantFoodImg} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default SectionBrochure;
