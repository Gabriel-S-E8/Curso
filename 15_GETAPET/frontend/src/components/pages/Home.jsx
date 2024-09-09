import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./home.module.css";

function Home() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        api.get("/pets").then((response) => {
            setPets(response.data.pets);
        });
    }, []);

    return (
        <section>
            <div className={styles.pet_home_header}>
                <h1>Adote um pet</h1>
                <p>Veja os detalhes de cada um e o seu tutor</p>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div className={styles.pet_card}>
                            <div
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                                }}
                                className={styles.pet_card_image}
                            ></div>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className="bold">Peso:</span> {pet.weight}
                                Kg
                            </p>
                            {pet.available ? (
                                <Link to={`pets/${pet._id}`}>Mais Detalhes</Link>
                            ) : (
                                <p className={styles.adopted_text}>Adotado</p>
                            )}
                        </div>
                    ))}
                {pets.length === 0 && (
                    <p>
                        Não há pets cadastrados ou disponiveis para adoção no
                        momento
                    </p>
                )}
            </div>
        </section>
    );
}

export default Home;
