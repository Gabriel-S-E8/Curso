import api from "../../../utils/api";
import styles from "./addPet.module.css";

import { useState } from "react";
import { useHistory } from "react-router-dom";

// hooks
import useFlashMessage from "../../../hooks/useFlashMessage";

//components
import PetForm from "../../form/petForm";

function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const history = useHistory()

    async function registerPet(pet) {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i]) 
                }
            } else{
                formData.append(key, pet[key])
            }
        })

        const data = await api.post('pets/create', formData, {
            Authorization : `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data'
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        
        if (msgType !== 'error') {
            history.push('/pets/dashboard')
        }
    }


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

export default AddPet;
