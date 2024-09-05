import { useContext, useState } from 'react';

import Input from '../../form/input';
import { Link } from 'react-router-dom';

import styles from '../../form/form.module.css';


// Context
import { Context } from '../../../context/UserContext';

function Register() {
    const [user, setUser] = useState({});
    const { register } = useContext(Context);

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        // enviar o usuario para o banco
        register(user);
    }

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu nome E-mail"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleOnChange}
                />
                <Input
                    text="Comfirmação de Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Comfirme a sua senha"
                    handleOnChange={handleOnChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Ja possui uma conta ? <a href="/login">Clique aqui</a>
            </p>
        </section>
    );
}

export default Register;
