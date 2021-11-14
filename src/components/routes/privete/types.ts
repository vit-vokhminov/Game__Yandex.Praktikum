import { fetchUser } from '../../../actions/auth/user';

export type Props = {
    children: JSX.Element;
    isAuthorized: boolean;
    isLoading: boolean;
    isUnauthorized: boolean;
    isUnexpectedError: boolean;
    user: typeof fetchUser;
};
