import { useState, useContext } from "react";
import Input from "../../form/input";
import styles from "../../form/form.module.css";
import { Link } from "react-router-dom";
// context
import { Context } from "../../../context/UserContext";

function Login() {
   const [user, setUser] = useState({})
   const {login} = useContext(Context)
   

    function handleOnChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault();
        login(user)
    }

   return (
      <section className={styles.form_container}>
         <h1>Login</h1>
         <form onSubmit={handleSubmit}>
            <Input
               text="E-mail"
               type="email"
               name="email"
               placeholder="Digite o seu e-mail"
               handleOnChange={handleOnChange}
            />
            <Input
               text="Senha"
               type="password"
               name="password"
               placeholder="Digite a sua senha"
               handleOnChange={handleOnChange}
            />
            <input type="submit" value='Entrar'/>
         </form>
         <p>
            Não tem uma conta? <a href="/register">Clique aqui</a>
         </p>
      </section>
   );
}

export default Login;
