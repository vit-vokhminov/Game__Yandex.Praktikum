import React from 'react';
import { Field as FinalFormField } from 'react-final-form';

const Field = ({ name, placeholder, type }) => {
    return (
        <FinalFormField name={name}>
            {({ input, meta }) => (
                <div>
                    <input {...input} className="input" name={name} type={type} placeholder={placeholder} />
                    {meta.error && meta.touched && <span className="input-block__error">{meta.error}</span>}
                </div>
            )}
        </FinalFormField>
    );
};

export default Field;
