import CN from "classnames";
import Spinner from 'components/UI/Spinner';
import s from "./button.module.css";

export const Button = ({ children, className, fullwidth, ...props }: any) => {
    const buttonClass = CN(s.btn, className, {[s.fullwidth]: fullwidth});

    return (
        <button {...props} className={buttonClass}>
            {children}
        </button>
    );
};


export const ButtonSpinner = ({ children, className, ...props }: any) => {
    const buttonClass = CN(s.btn, s.btn_spinner, className);
	
    return (
        <button {...props} className={buttonClass}>
            <Spinner />
        </button>
    );
};
