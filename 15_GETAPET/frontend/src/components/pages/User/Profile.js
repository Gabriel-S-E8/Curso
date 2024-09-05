import api from "../../../utils/api";

import { useState, useEffect } from "react";

import styles from "./profile.module.css";
import formStyles from "../../form/form.module.css";

import Input from "../../form/input";

function Profile() {
   const [token] = useState(localStorage.getItem("token") || "");
   const [user, setUser] = useState({});

   useEffect(() => {
      api
	  .get("/users/checkuser", {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
         },
      })
	  .then((response) => {
         setUser(response.data);
		 
      });
   }, [token]);

   

   function onFileChange(e) {}

   function handleChange(e) {}

   return (
      <section>
         <div className={styles.profile_header}>
            <h1>Perfil</h1>
            <p>Preview Imagen</p>
         </div>
         <form className={formStyles.form_container}>
            <Input
               text="Imagen"
               type="file"
               name="image"
               accept="image/*"
               handleOnChange={onFileChange}
            />
            <Input
               text="E-mail"
               type="email"
               name="email"
               placeholder="Digite o seu e-mail"
               handleOnChange={handleChange}
               value={user.email || ""}
            />
            <Input
               text="Nome"
               type="text"
               name="name"
               placeholder="Digite o seu nome"
               handleOnChange={handleChange}
               value={user.name || ""}
            />
            <Input
               text="Telefone"
               type="text"
               name="phone"
               placeholder="Digite o seu telefone"
               handleOnChange={handleChange}
               value={user.phone || ""}
            />
            <Input
               text="Senha"
               type="password"
               name="password"
               placeholder="Digite a sua senha"
               handleOnChange={handleChange}
            />
            <Input
               text="Confirmação de senha"
               type="password"
               name="confirmpassword"
               placeholder="Digite a sua senha"
               handleOnChange={handleChange}
            />
            <input type="submit" value="Editar" />
         </form>
      </section>
   );
}

export default Profile;
