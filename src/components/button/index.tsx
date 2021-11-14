import React, { ReactElement } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    fullWidth?: boolean;
}

const Button = ({
    type = 'button',
    fullWidth,
    children,
    ...other
}: ButtonProps) => (
    <button
        type={type}
        className={
            fullWidth
            ? 'fullwidth btn'
            : 'btn'
        }
        {...other}
    >
{children}
    </button>
);

Button.defaultProps = {
    fullWidth: null,
};

export default Button;
