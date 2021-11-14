import { passwordAction } from '../../../actions/users/password';
import type { PasswordProps } from '../../../../app/api/users/types';

export type Props = {
    password: typeof passwordAction,
};

export type PasswordFormProps = PasswordProps & {
    confirmNewPassword: string;
};
