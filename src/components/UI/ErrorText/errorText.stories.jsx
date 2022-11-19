import { ErrorText } from ".";

export default {
    title: "FORM / ErrorText",
};

export const Default = () => (
    <div style={{ width: "300px" }}>
        <ErrorText>Неверный код. Попробуйте ввести заново</ErrorText>
    </div>
);
