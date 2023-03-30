import React, { useRef }  from "react";
import logoImg from "../../assets/logo.svg";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErrors";
import Input from "../../components/Input";
import Button from "../../components/Button";

import * as C from "./styles";

const SignUp = () => {
    const formRef = useRef<FormHandles>(null)


    async function handleSubmit(data: object) {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string().required("Nome obrigatório"),
                email: Yup.string()
                    .required("E-mail obrigatório")
                    .email("Digite um email válido"),
                password: Yup.string()
                    .min(8, "Mínimo 8 digitos"),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (err) {
            console.log({err});

            const errors = getValidationErrors(err as Yup.ValidationError)
            formRef.current?.setErrors(errors)

        }
    }

    return (
        <C.Container>
            <C.Background />
            <C.Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input
                        name="name"
                        icon={FiUser}
                        type="text"
                        placeholder="Nome"
                    />
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
                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="subscribe">
                    <FiArrowLeft />
                    Voltar para logon
                </a>
            </C.Content>
        </C.Container>
    );
};

export default SignUp;
