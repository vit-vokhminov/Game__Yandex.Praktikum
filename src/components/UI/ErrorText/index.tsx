import classNames from 'classnames';
import s from './errorText.module.css';

export const ErrorText = ({ children, className, ...props }: any) => {
    const errorClass = classNames({
        [s.error]: true,
        [className]: Boolean(className)
    });

    return (
        <div
            className={errorClass}
            {...props}>
            {children}
        </div>
    );
};
