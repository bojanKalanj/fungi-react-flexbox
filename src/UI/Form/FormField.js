import React from 'react';
import './Input/Input';

const FormField = ({ input, label, placeholder, type, meta: { touched, error } }) => (
  <div className="Input">
    <label>{label}</label>
    <input {...input} placeholder={placeholder} type={type} className="Input" />
    <div className="input-error">{touched && error && <span>{error}</span>}</div>
  </div>
)

export default FormField;