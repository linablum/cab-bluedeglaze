const handleSubmit = (e, func, state) => {
  const form = e.currentTarget;
  if (form.checkValidity() === false) {
    e.preventDefault();
    e.stopPropagation();
  }
  state();
  if (form.checkValidity() === true) {
    e.preventDefault();
    func();
  }
};

export { handleSubmit };
