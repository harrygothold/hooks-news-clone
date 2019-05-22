import React, { useState } from "react";

import useFormValidation from "./useFormValidation";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(
    INITIAL_STATE
  );
  const [login, setLogin] = useState(true);
  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            type="text"
            placeholder="Your name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            name="name"
          />
        )}
        <input
          type="email"
          placeholder="Your email"
          autoComplete="off"
          onChange={handleChange}
          name="email"
          value={values.email}
        />
        <input
          type="password"
          placeholder="Choose a secure password"
          onChange={handleChange}
          name="password"
          value={values.password}
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
            Submit
          </button>
          <button
            onClick={() => setLogin(prevLogin => !prevLogin)}
            type="button"
            className="pointer button"
          >
            {login ? "Need to create an account?" : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
