import React from 'react';
import classNames from 'classnames';
import { ErrorMessage, useField } from 'formik';

type Props = {
    name: string,
    placeholder: string,
    type: string,
};

const TextInput = (props: Props) => {
    const [field, meta] = useField(props);
    const inputStyle = classNames('input', { 'error-input': meta.touched && meta.error });
    return (
        <>
            <input className={inputStyle} {...field} {...props} />
            <ErrorMessage component="div" className="error-msg" name={field.name} />
        </>
    );
};

export default TextInput;
