import React from 'react';

function Input({name, onChange, errors, label, user}) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type="text" className="form-control" id={name} name={name} onChange={onChange} value={user[name]} />
            {errors && errors[name] && <div className="alert alert-danger" role="alert">{errors[name]}</div>}
        </div>
    );
}

export default Input;