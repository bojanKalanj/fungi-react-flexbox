const validate = values => {
    const errors = {};
    if (!values.area) {
      errors.area = 'neophodno je uneti područje';
    }
    if (!values.location) {
      errors.location = 'neophodno je uneti lokaciju';
    }
    if (!values.description) {
        errors.description = 'neophodno je uneti opis'
      }
    return errors;
  }
  
  export default validate;