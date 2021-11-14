import { signupAction } from '../../actions/auth/signup';
import type { SignupStore } from '../../reducers/collections/auth/types';
import type { SignupProps } from '../../../app/api/auth/types';

export type Props = {
    signupResult: SignupStore;
    signup: typeof signupAction;
};

export type SignupFormProps = SignupProps & {
    'confirm': string;
};
