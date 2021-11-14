import { SchemaOf, ValidationError } from 'yup';
import { setIn } from 'final-form';

export const validateFormValues = <T, V>(schema: SchemaOf<T>) => {
    return async (values: V) => {
        try {
            await schema.validate(values, { abortEarly: false });
        } catch (error) {
            return (error as ValidationError).inner.reduce((errors, innerError) => {
				if (innerError.path) {
					return setIn(errors, innerError.path, innerError.message);
				}

                return setIn(errors, '', innerError.message);
            }, {});
        }
    };
};
