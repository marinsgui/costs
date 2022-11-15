import { useEffect, useState } from 'react';

import Input from '../Input';
import Select from '../Select';
import Submit from '../Submit';
import './styles.css';

export default function Form({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

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

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return (
        <form onSubmit={submit} className='form'>
            <Input 
            type='text' 
            text='Nome do projeto' 
            name='name' 
            placeholder='Insira o nome do seu projeto'
            handleOnChange={handleChange} 
            />

            <Input 
            type='number' 
            text='Orçamento do projeto'
            name='budget' 
            placeholder='Insira o orçamento total'
            handleOnChange={handleChange} 
            />

            <Select 
            name='category-id' 
            text='Selecione a categoria' 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''} 
            />

            <Submit text={btnText} />
        </form>
    )
}