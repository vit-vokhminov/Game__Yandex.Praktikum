import CN from 'classnames';
import ForwardIcon from 'assets/svg/forward.svg';
import s from './forwardBtn.module.css';

const ForwardBtn = ({ className, ...props }: any) => {
    const forwardClass = CN(s.btn_back_icon, className);

    return (
        <div
            {...props}
            className={forwardClass}>
            <ForwardIcon />
        </div>
    );
};

export default ForwardBtn;
