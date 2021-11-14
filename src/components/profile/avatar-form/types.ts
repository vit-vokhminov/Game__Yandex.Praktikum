import { avatarAction } from '../../../actions/users/avatar';

export type Props = {
    avatarLink: null | string;
    avatar: typeof avatarAction;
};

export type FormProps = {
    avatar: FileList;
};
