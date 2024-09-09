// Importação do hook de estado do React
import { useState } from "react";

// Importação de estilos para o formulário
import formStyles from "./form.module.css";

// Importação do componente de input
import Input from "./input";

// Importação do componente de seleção
import Select from "./Select";

// Definição do componente de formulário de pet
function PetForm({ handleSubmit, petData, btnText }) {
    // Estado para armazenar os dados do pet
    const [pet, setPet] = useState(petData || {});

    // Estado para armazenar a pré-visualização das imagens do pet
    const [preview, setPreview] = useState([]);

    // Array de cores para seleção
    const colors = ["White", "Black", "Brown", "Caramel", "Gray", "mixed"];

    // Função para lidar com a mudança de arquivo de imagem
    function onFileChange(e) {
        setPreview(Array.from(e.target.files));
        setPet({ ...pet, images: [...e.target.files] });
    }

    // Função para lidar com a mudança de valor de input
    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value });
    }

    // Função para lidar com a mudança de cor
    function handleColor(e) {
        setPet({
            ...pet,
            color: e.target.options[e.target.selectedIndex].text,
        });
    }

    // Função para lidar com o envio do formulário
    function submit(e) {
        e.preventDefault();

        handleSubmit(pet);
    }

    // Renderização do formulário
    return (
        <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                          <img
                              src={URL.createObjectURL(image)}
                              alt={pet.name}
                              key={`${pet.name} + ${index}`}
                          />
                      ))
                    : pet.images &&
                      pet.images.map((image, index) => (
                          <img
                              src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                              alt={pet.name}
                              key={`${pet.name} + ${index}`}
                          />
                      ))}
            </div>
            <Input
                text="Imagens do Pet"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input
                text="Nome do Pet"
                type="name"
                name="name"
                placeholder="Digite o nome do seu pet"
                handleOnChange={handleChange}
                value={pet.name || ""}
            />
            <Input
                text="Idade"
                type="text"
                name="age"
                placeholder="Digite a idade do seu pet"
                handleOnChange={handleChange}
                value={pet.age || ""}
            />
            <Input
                text="Peso do Pet"
                type="number"
                name="weight"
                placeholder="Digite o peso do seu pet"
                handleOnChange={handleChange}
                value={pet.weight || ""}
            />
            <Select
                name="color"
                text="Selecione a cor"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ""}
            />
            <input type="submit" value={btnText} />
        </form>
    );
}

// Exportação do componente de formulário de pet
export default PetForm;
