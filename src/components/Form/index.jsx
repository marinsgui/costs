import { useEffect, useState } from 'react';

import Input from '../Input';
import Select from '../Select';
import Submit from '../Submit';
import './styles.css';

export default function Form({ btnText }) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, [])

    return (
        <form className='form'>
            <Input 
            type='text' 
            text='Nome do projeto' 
            name='name' 
            placeholder='Insira o nome do seu projeto' 
            />

            <Input 
            type='number' 
            text='Orçamento do projeto'
            name='budget' 
            placeholder='Insira o orçamento total' 
            />

            <Select name='category-id' text='Selecione a categoria' options={categories} />

            <Submit text={btnText} />
        </form>
    )
}