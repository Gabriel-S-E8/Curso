import { useContext, useState } from "react";

import Input from "../../form/input";
import { Link } from "react-router-dom";

import styles from "../../form/form.module.css";

// Context
import { Context } from "../../../context/UserContext";

// Função Register que retorna um formulário de registro
function Register() {
    // Estado do usuário, inicializado como um objeto vazio
    const [user, setUser] = useState({});

    // Contexto que fornece a função de registro
    const { register } = useContext(Context);

    // Função que é chamada quando o usuário digita algo em um campo de formulário
    function handleOnChange(e) {
        // Atualiza o estado do usuário com o novo valor digitado
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    // Função que é chamada quando o usuário clica no botão "Cadastrar"
    function handleSubmit(e) {
        // Previne o comportamento padrão do formulário de ser enviado para o servidor
        e.preventDefault();
        // Envia o usuário para o banco de dados
        register(user);
    }

    // Renderização do formulário
    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                {/* Campo de nome */}
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleOnChange}
                />
                {/* Campo de telefone */}
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleOnChange}
                />
                {/* Campo de email */}
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu email"
                    handleOnChange={handleOnChange}
                />
                {/* Campo de senha */}
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleOnChange}
                />
                {/* Campo de confirmação de senha */}
                <Input
                    text="Comfirmação de Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Comfirme a sua senha"
                    handleOnChange={handleOnChange}
                />
                {/* Botão de cadastro */}
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já possui uma conta? <a href="/login">Clique aqui</a>
            </p>
        </section>
    );
}

export default Register;
