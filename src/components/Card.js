import "./Card.css";

function Card({ description, title, imgURL, dishPrice }) {
  return (
    <>
      <div className="card">
        <img className="img-card" src={imgURL} alt="food pic"></img>
        <div>
          <div className="title-price">
            <h3>{title}</h3>
            <p className="price-card">{dishPrice}</p>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
export default Card;
