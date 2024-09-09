import { useState, useContext } from "react";
import Input from "../../form/input";
import styles from "../../form/form.module.css";
import { Link } from "react-router-dom";
// context
import { Context } from "../../../context/UserContext";

// Função Login que retorna um formulário de login
function Login() {
    // Estado do usuário, inicializado como um objeto vazio
    const [user, setUser] = useState({});

    // Contexto que fornece a função de login
    const { login } = useContext(Context);

    // Função que é chamada quando o usuário digita algo em um campo de formulário
    function handleOnChange(e) {
        // Atualiza o estado do usuário com o novo valor digitado
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    // Função que é chamada quando o usuário clica no botão "Entrar"
    function handleSubmit(e) {
        // Previne o comportamento padrão do formulário de ser enviado para o servidor
        e.preventDefault();
        // Envia o usuário para o banco de dados
        login(user);
    }

    // Renderização do formulário
    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {/* Campo de e-mail */}
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
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
                {/* Botão de entrar */}
                <input type="submit" value="Entrar" />
            </form>
            <p>
                Não tem uma conta? <a href="/register">Clique aqui</a>
            </p>
        </section>
    );
}

export default Login;
