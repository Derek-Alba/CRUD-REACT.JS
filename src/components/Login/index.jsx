import './style.css'
const Login = () => {
  return (
    <>
      <div className="wrapper ">
        <div className="card-switch">
          <label className="switch">
            <input className="toggle" type="checkbox" disabled />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Log in</div>
                {/* {errorLogin && (
                  <div className="alert alert-danger" role="alert">
                    Usuario o Contraseña incorrectas
                  </div>
                )} */}
                <form action="" className="flip-card__form">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="flip-card__input"
                    // onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="flip-card__input"
                    // onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    // onClick={(event) => Login(event, email, password)}
                    className="flip-card__btn"
                  >
                    Let`s go!
                  </button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form action="" className="flip-card__form">
                  <input
                    type="name"
                    placeholder="Name"
                    className="flip-card__input"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="flip-card__input"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="flip-card__input"
                  />
                  <button className="flip-card__btn">Confirm!</button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default Login;
