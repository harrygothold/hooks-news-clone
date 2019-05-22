import React, { useState } from "react";

function useFormValidation(initialState) {
  const [values, setValues] = useState(initialState);
  function handleChange(e) {
    e.persist();
    setValues(previousValues => ({
      ...previousValues,
      [e.target.name]: e.target.value
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log({ values });
  }
  return { handleChange, handleSubmit, values };
}

export default useFormValidation;
