import type { AxiosError } from 'axios';

type Error = {
    reason: string;
};

export type ErrorType = AxiosError<Error>;
