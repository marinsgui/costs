import './styles.css';

import { useState } from 'react';

import Input from '../Input';
import Submit from '../Submit';

export default function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className='form'>
            <Input 
            type='text' 
            text='Nome do serviço' 
            name='name' 
            placeholder='Insira o nome do serviço' 
            handleOnChange={handleChange} 
            />

            <Input 
            type='number' 
            text='Valor do serviço' 
            name='cost' 
            placeholder='Insira o valor total' 
            handleOnChange={handleChange} 
            />

            <Input 
            type='text' 
            text='Descrição do serviço' 
            name='description' 
            placeholder='Descreva o serviço' 
            handleOnChange={handleChange} 
            />

            <Submit text={btnText} />
        </form>
    )
}