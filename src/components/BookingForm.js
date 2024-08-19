import "./BookingForm.css";
import resturantImg from "../assets/icons_assets/restaurant.jpg";

function BookingForm() {
  const handleSubmit = (event) => {
  }

  return (
    <div>
      <img className="booking-img" src={resturantImg} alt="resturant" />
      <form onSubmit={handleSubmit} className="booking-form-style">
        <label htmlFor="res-date">Choose date</label>
        <input type="date" id="res-date" />
        <label htmlFor="res-time">Choose time</label>
        <select id="res-time ">
          <option>17:00</option>
          <option>18:00</option>
          <option>19:00</option>
          <option>20:00</option>
          <option>21:00</option>
          <option>22:00</option>
        </select>
        <label htmlFor="guests">Number of guests</label>
        <input type="number" placeholder="1" min="1" max="10" id="guests" />
        <label htmlFor="occasion">Occasion</label>
        <select id="occasion">
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        <input type="submit" value="Make Your reservation" />
      </form>
    </div>
  );
}

export default BookingForm;
