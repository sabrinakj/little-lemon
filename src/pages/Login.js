import "./Login.css";

function Login() {
  return (
    <section className="login-section">
      <div className="login-container">
        <form className="login-form">
          <label>
            <p>Username</p>
            <input type="text" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" />
          </label>
          <div className="login-div-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
