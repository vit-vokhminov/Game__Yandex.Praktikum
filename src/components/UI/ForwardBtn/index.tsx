import CN from 'classnames';
import ForwardIcon from 'assets/svg/forward.svg';
import s from './forwardBtn.module.css';

const ForwardBtn = ({ className, ...props }: any) => {
    const forwardClass = CN(s.btn_back_icon, className);

    return (
        <ForwardIcon
            {...props}
            className={forwardClass}
        />
    );
};

export default ForwardBtn;
