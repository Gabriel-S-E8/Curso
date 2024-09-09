// Importação de módulos necessários
import api from "../../../utils/api";

// Importação de hooks do React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Importação de estilos para o componente de edição de pet
import styles from "./addPet.module.css";

// Importação do componente de formulário de pet
import PetForm from "../../form/petForm";

// Importação do hook para exibição de mensagens
import useFlashMessage from "../../../hooks/useFlashMessage";

// Definição do componente de edição de pet
function EditPet() {
    // Estado para armazenar o pet a ser editado
    const [pet, setPet] = useState({});

    // Estado para armazenar o token de autenticação do usuário
    const [token] = useState(localStorage.getItem("token") || "");

    // Obtenção do parâmetro de ID da rota
    const { id } = useParams();

    // Instanciação do hook para exibição de mensagens
    const { setFlashMessage } = useFlashMessage();

    // Efeito para buscar o pet a ser editado quando o token ou ID for alterado
    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            setPet(response.data.pet);
        });
    }, [token, id]);

    // Função para atualizar o pet
    async function updatePet(pet) {
        let msgType = "success";

        // Criação de uma instância de FormData para envio de arquivos
        const formData = new FormData();

        // Iteração sobre as chaves do objeto pet para adicioná-las ao FormData
        await Object.keys(pet).forEach((key) => {
            if (key === "images") {
                // Adição de múltiplas imagens ao FormData
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append(`images`, pet[key][i]);
                }
            } else {
                formData.append(key, pet[key]);
            }
        });

        // Requisição de patch para atualizar o pet
        const data = await api
            .patch(`/pets/${pet._id}`, formData, {
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

    // Renderização do componente de edição de pet
    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando o Pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizado no sistema</p>
            </div>
            {pet.name && (
                <PetForm
                    handleSubmit={updatePet}
                    btnText="Atualizar"
                    petData={pet}
                />
            )}
        </section>
    );
}

// Exportação do componente de edição de pet
export default EditPet;
