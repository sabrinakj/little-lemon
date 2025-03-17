import "./About.css";
import imageResturantA from "../assets/icons_assets/Mario and Adrian A-433x288.png";
import imageBruschette from "../assets/icons_assets/bruschette-small.png";

function About( { isInHome } ) {
  const aboutContainerClass = isInHome ? "about-container" : "about-container-in-page";
  return (
    <div className={aboutContainerClass}>
      <div className="about-subcontainer">
        <div className="about-div-description">
          <h1 className="about-h1">Little Lemon</h1>
          <h2 className="about-h2">Chicago</h2>
          <p className="about-p">
            Adrian and Mario, two passionate chefs, have opened their dream
            restaurant, The Little Lemon. This charming eatery offers a
            delightful culinary experience, with a focus on fresh, seasonal
            ingredients and Mediterranean flavors. From zesty lemon-infused
            dishes to classic Italian favorites, The Little Lemon promises to
            tantalize your taste buds and leave you craving more.
          </p>
        </div>
        <div className="about-div-images">
          <img
            className="about-img-one"
            src={imageResturantA}
            alt="two chefs inside the kitchen"
          />
          <img
            className="about-img-two"
            src={imageBruschette}
            alt="two chefs are cooking"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
