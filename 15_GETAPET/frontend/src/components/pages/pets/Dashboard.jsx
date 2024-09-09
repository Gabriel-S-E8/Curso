// Importação de módulos necessários
import api from "../../../utils/api";

// Importação de estilos para o componente de dashboard
import styles from "./dashboard.module.css";

// Importação do componente de imagem arredondada
import RoundedImage from "../../layouts/Roundedimage";

// Importação de hooks do React
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importação do hook para exibição de mensagens
import useFlashMessage from "../../../hooks/useFlashMessage";

// Definição do componente de dashboard
function Dashboard() {
    // Estado para armazenar a lista de pets do usuário
    const [pets, setPets] = useState([]);

    // Estado para armazenar o token de autenticação do usuário
    const [token] = useState(localStorage.getItem("token") || "");

    // Instanciação do hook para exibição de mensagens
    const { setFlashMessage } = useFlashMessage();

    // Efeito para buscar a lista de pets do usuário quando o token for alterado
    useEffect(() => {
        api.get("/pets/mypets", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            setPets(response.data.pets);
        });
    }, [token]);

    // Função para remover um pet
    async function removePet(id) {
        let msgType = "success";

        const data = await api
            .delete(`/pets/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                const updatedPets = pets.filter((pet) => pet._id !== id);
                setPets(updatedPets);
                return response.data;
            })
            .catch((err) => {
                msgType = "error";
                return err.response.data;
            });

        setFlashMessage(data.message, msgType);
    }

    // Função para concluir a adoção de um pet
    async function concludeAdoption(id) {
        let msgType = "success";

        const data = await api
            .patch(`/pets/conclude/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                msgType = "error";
                return err.response.data;
            });

        setFlashMessage(data.message, msgType);
    }

    // Renderização do componente de dashboard
    return (
        <section>
            <div className={styles.petslist_header}>
                <h1>Meus Pets</h1>
                <Link to="/pets/add">Cadastrar Pet</Link>
            </div>
            <div className={styles.petlist_container}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div className={styles.petlist_row} key={pet._id}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px75"
                            />
                            <span className="bold">{pet.name}</span>
                            <div className={styles.actions}>
                                {pet.available ? (
                                    <>
                                        {pet.adopter && (
                                            <button
                                                className={styles.conclude_btn}
                                                onClick={() => {
                                                    concludeAdoption(pet._id);
                                                }}
                                            >
                                                Concluir adoção
                                            </button>
                                        )}
                                        <Link to={`/pets/edit/${pet._id}`}>
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => {
                                                removePet(pet._id);
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </>
                                ) : (
                                    <p>Pet já Adotado</p>
                                )}
                            </div>
                        </div>
                    ))}
                {pets.length === 0 && <p>Não há pets cadastrados</p>}
            </div>
        </section>
    );
}

// Exportação do componente de dashboard
export default Dashboard;
