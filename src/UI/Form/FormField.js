import React from 'react';

const FormField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className="form-field">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      <div className="input-error">{touched && error && <span>{error}</span>}</div>
    </div>
  </div>
)

export default FormField;