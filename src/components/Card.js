import "./Card.css";

function Card({ description, title, imgURL, dishPrice, delivery, isSmall }) {
  const cardClass = isSmall ? "card-small" : "card";
  const imgClass = isSmall ? "img-card-small" : "img-card";
  const cardDescripClass = isSmall ? "descrip-card-small" : "descrip-card";

  return (
    <div className={cardClass}>
      <img className={imgClass} src={imgURL} alt="food pic" />
      <div className={cardDescripClass}>
        <div className="div-card-first">
          <h3 className="user-reviewer">{title}</h3>
          <p className="card-delivery">{dishPrice}</p>
        </div>
        <div className="div-card-second">
          <p className="descrip-margin">{description}</p>
          <p>{delivery}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
