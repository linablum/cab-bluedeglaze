import { useState } from "react";

function useHandleSubmit() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (e, func) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      e.preventDefault();
      func();
    }
  };
  return { handleSubmit, validated };
}

export default useHandleSubmit;
