import api from "../../../utils/api";

import styles from "./dashboard.module.css";
import RoundedImage from "../../layouts/Roundedimage";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// hooks
import useFlashMessage from "../../../hooks/useFlashMessage";

function Dashboard() {
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem("token") || "");
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get("/pets/mypets", {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            setPets(response.data.pets);
        });
    }, [token]);

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

    async function concludeAdoption(id) {
        let msgType = 'success';

        const data = await api.patch(`/pets/conclude/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            return response.data;
        }).catch((err) => {
            msgType = 'error';
            return err.response.data;
        })

        setFlashMessage(data.message, msgType)


    }


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

export default Dashboard;
