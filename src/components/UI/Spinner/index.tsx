import { FC } from 'react';
import CN from 'classnames';
import { ImSpinner } from 'react-icons/im';
import s from './Styles.module.css';

interface SpinnerI {
    className?: string;
    size?: number;
}

const Spinner: FC<SpinnerI> = ({ className, size = 25 }) => {
    const spinnerClass = CN(s.spinner, className);

    return (
        <ImSpinner
            size={size}
            className={spinnerClass}
        />
    );
};

export default Spinner;
