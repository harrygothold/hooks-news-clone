import React, { useState } from "react";

import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting,
    values
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);

  async function authenticateUser() {
    const { name, email, password } = values;
    const response = login
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password);
    console.log(response);
  }

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
          className={errors.email && "error-input"}
          value={values.email}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          placeholder="Choose a secure password"
          onChange={handleChange}
          name="password"
          className={errors.password && "error-input"}
          value={values.password}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
            className="button pointer mr2"
          >
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
