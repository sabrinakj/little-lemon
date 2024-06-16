import "./Card.css";

function Card({description, title, imgURL}) {
  return(
    <>
    <div id="card">
      <img src={imgURL} alt="food pic"></img>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
    </>
  )
}
export default Card;