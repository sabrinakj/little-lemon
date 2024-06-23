import "./Card.css";

function Card({ description, title, imgURL, dishPrice, delivery }) {
  return (
    <>
      <div className="card">
        <img className="img-card" src={imgURL} alt="food pic"></img>

        <div className="descrip-card">

          <div className="div-card-first">
            <h3>{title}</h3>
            <p className="card-delivery">{dishPrice}</p>
          </div>

          <div className="div-card-second">
            <p>{description}</p>
            <p>{delivery}</p>
          </div>

        </div>
      </div>
    </>
  );
}
export default Card;
