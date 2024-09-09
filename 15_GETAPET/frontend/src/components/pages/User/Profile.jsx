// Importação de módulos necessários
import api from "../../../utils/api";
import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import formStyles from "../../form/form.module.css";
import Input from "../../form/input";
import RoundedImage from "../../layouts/Roundedimage";
import useFlashMessage from "../../../hooks/useFlashMessage";

// Definição do componente de perfil do usuário
function Profile() {
   // Declaração do estado de usuário e preview da imagem
   const [user, setUser] = useState({});
   const [preview, setPreview] = useState();

   // Obtenção do token de autenticação do local storage
   const [token] = useState(localStorage.getItem("token") || "");

   // Instanciação do hook para exibição de mensagens
   const { setFlashMessage } = useFlashMessage();

   // useEffect para buscar os dados do usuário após o carregamento do componente
   useEffect(() => {
      api.get("/users/checkuser", {
         headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
         },
      }).then((response) => {
         setUser(response.data.currentUser);
      });
   }, [token]);

   // Função para atualizar a imagem de preview e o estado do usuário
   function onFileChange(e) {
      setPreview(e.target.files[0])
      setUser({ ...user, [e.target.name]: e.target.files[0] });
   }

   // Função para atualizar o estado do usuário com base no evento de input
   function handleChange(e) {
      setUser({ ...user, [e.target.name]: e.target.value });
   }

   // Função para lidar com o envio do formulário de edição do perfil
   async function handleSubmit(e) {
      e.preventDefault();

      let msgType = "success";

      // Criação de uma instância de FormData para envio de arquivos
      const formData = new FormData();

      // Iteração sobre as chaves do objeto user para adicioná-las ao FormData
      await Object.keys(user).forEach((key) => {
         formData.append(key, user[key]);
      });

      // Requisição de patch para atualizar o perfil do usuário
      const data = await api
         .patch(`/users/edit/${user._id}`, formData, {
            headers: {
               Authorization: `Bearer ${JSON.parse(token)}`,
               "Content-Type": "multipart/form-data",
            },
         })
         .then((response) => {
            return response.data;
         })
         .catch((err) => {
            msgType = "error";
            return err.response.data;
         });

      // Exibição da mensagem de sucesso ou erro com base no resultado da requisição
      setFlashMessage(data.message, msgType);
   }

   // Renderização do componente de perfil do usuário
   return (
      <section>
         <div className={styles.profile_header}>
            <h1>Perfil</h1>
            {(user.image || preview) && (
               <RoundedImage
                  src={
                     preview
                        ? URL.createObjectURL(preview)
                        : `${process.env.REACT_APP_API}/images/users/${user.image}`
                  }
                  alt={user.name}
               />
            )}
         </div>
         <form onSubmit={handleSubmit} className={formStyles.form_container}>
            <Input
               text="Imagem"
               type="file"
               name="image"
               handleOnChange={onFileChange}
            />
            <Input
               text="E-mail"
               type="email"
               name="email"
               placeholder="Digite o e-mail"
               handleOnChange={handleChange}
               value={user.email || ""}
            />
            <Input
               text="Nome"
               type="text"
               name="name"
               placeholder="Digite o nome"
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
               placeholder="Confirme a sua senha"
               handleOnChange={handleChange}
            />
            <input type="submit" value="Editar" />
         </form>
      </section>
   );
}

// Exportação do componente de perfil do usuário
export default Profile;