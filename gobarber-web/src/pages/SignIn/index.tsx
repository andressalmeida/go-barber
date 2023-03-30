import React, { useRef } from "react";
import logoImg from "../../assets/logo.svg";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import Input from "../../components/Input";
import Button from "../../components/Button";

import * as C from "./styles";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import getValidationErrors from "../../utils/getValidationErrors";
import { useAuth } from "../../contexts/AuthContext";

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn = () => {
    const formRef = useRef<FormHandles>(null);

    const {user, signIn} = useAuth()

    console.log(user)

    async function handleSubmit(data: SignInFormData) {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("E-mail obrigatório")
                    .email("Digite um email válido"),
                password: Yup.string().required("Senha obrigatória"),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            signIn({
                email: data.email,
                password: data.password
            })
            console.log(data.email)


        } catch (err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err as Yup.ValidationError);
                formRef.current?.setErrors(errors);
            } else {
                //disparar toast 
            }


        }
    }
    return (
        <C.Container>
            <C.Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input
                        name="email"
                        icon={FiMail}
                        type="text"
                        placeholder="E-mail"
                    />
                    <Input
                        name="password"
                        icon={FiLock}
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="subscribe">
                    <FiLogIn />
                    Criar conta
                </a>
            </C.Content>

            <C.Background />
        </C.Container>
    );
};

export default SignIn;
