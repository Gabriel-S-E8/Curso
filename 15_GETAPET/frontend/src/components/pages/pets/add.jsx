// Importação de módulos necessários
import api from "../../../utils/api";
import styles from "./addPet.module.css";

// Importação de hooks do React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importação do hook para exibição de mensagens
import useFlashMessage from "../../../hooks/useFlashMessage";

// Importação do componente de formulário de pet
import PetForm from "../../form/petForm";

// Definição do componente de cadastro de pet
function AddPet() {
    // Obtenção do token de autenticação do local storage
    const [token] = useState(localStorage.getItem("token") || "");

    // Instanciação do hook para exibição de mensagens
    const { setFlashMessage } = useFlashMessage();

    // Instanciação do hook para navegação
    const navigate = useNavigate();

    // Função para cadastrar um pet
    async function registerPet(pet) {
        let msgType = "success";

        // Criação de uma instância de FormData para envio de arquivos
        const formData = new FormData();

        // Iteração sobre as chaves do objeto pet para adicioná-las ao FormData
        await Object.keys(pet).forEach((key) => {
            if (key === "images") {
                // Adição de múltiplas imagens ao FormData
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append("images", pet[key][i]);
                }
            } else {
                formData.append(key, pet[key]);
            }
        });

        // Requisição de post para cadastrar o pet
        const data = await api
            .post("pets/create", formData, {
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

        // Redirecionamento para a página de dashboard de pets se a requisição for bem-sucedida
        if (msgType !== "error") {
            navigate("/pets/dashboard");
        }
    }

    // Renderização do componente de cadastro de pet
    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficara disponivel para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar" />
        </section>
    );
}

// Exportação do componente de cadastro de pet
export default AddPet;
