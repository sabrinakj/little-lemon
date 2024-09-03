import "./About.css";
import imageResturantA from "../assets/icons_assets/Mario and Adrian A.jpg";
import imageResturantB from "../assets/icons_assets/Mario and Adrian b.jpg";

function About() {
  return (
    <div className="about-page">
      <div className="about-div-left">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          Adrian and Mario, two passionate chefs, have opened their dream
          restaurant, The Little Lemon. This charming eatery offers a delightful
          culinary experience, with a focus on fresh, seasonal ingredients and
          Mediterranean flavors. From zesty lemon-infused dishes to classic
          Italian favorites, The Little Lemon promises to tantalize your taste
          buds and leave you craving more.
        </p>
      </div>
      <div className="about-div-right">
        <img
          className="about-img-one"
          src={imageResturantA}
          alt="two chefs inside the kitchen"
        />
        <img
          className="about-img-two"
          src={imageResturantB}
          alt="two chefs are cooking"
        />
      </div>
    </div>
  );
}

export default About;
