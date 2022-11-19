import CN from 'classnames';
import s from './input.module.css';

export const Input = ({ field, form, className, ...props }: any) => {
    const inputClass = CN(s.input, className);

    return (
        <input
            className={inputClass}
            {...props}
            {...field}
        />
    );
};
