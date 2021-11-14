import type { UserResponse } from '../../../../app/api/auth/types';
import { profileAction } from '../../../actions/users/profile';

export type Props = {
    user: UserResponse;
    profile: typeof profileAction;
};
