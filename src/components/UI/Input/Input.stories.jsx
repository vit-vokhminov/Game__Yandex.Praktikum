import { Input, InputConst, InputWithoutBorder, MaskedInput } from '.';

export default {
    title: "FORM / Inputs",
};

export const ALL = () => (
    <div style={{ width: "300px" }}>
        <h3>Пустой input</h3>
        <Input />

        <h3>input с текстом</h3>
        <Input value="Something" />

        <h3>input Email</h3>
        <Input type="email" />

        <h3>input Password</h3>
        <Input type="password" />

        <h3>input placeholder</h3>
        <Input placeholder="Some placeholder" />

        <h3>input Disabled</h3>
        <Input disabled />

        <h3>input с коричневым фоном</h3>
        <InputConst />

        <h3>input без border'а</h3>
        <InputWithoutBorder />

        <h3>Masked input</h3>
        <MaskedInput mask="99-99-9999"/>
    </div>
);

export const Default = () => <Input />;

export const WithValue = () => <Input value="Something" />;

export const Password = () => <Input type="password" />;

export const Email = () => <Input type="email" />;

export const WithPlaceholder = () => <Input placeholder="Some placeholder" />;

export const Disabled = () => <Input disabled />;

export const DefaultBrown = () => <InputConst />;

export const WithoutBorder = () => <InputWithoutBorder />;
