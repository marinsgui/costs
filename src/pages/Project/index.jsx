import { parse, v4 as uuidv4 } from 'uuid';

import './styles.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../../components/Loading';
import Container from '../../components/Container';
import Form from '../../components/Form';
import ServiceForm from '../../components/ServiceForm';
import Message from '../../components/Message';
import ServiceCard from '../../components/ServiceCard';

export default function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch(err => console.log(err));
        }, 300);
    }, [id]);

    function createService(project) {
        setMessage('')
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {
        setMessage('')

        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser maior do que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')

        })
        .catch(err => console.log(err));
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter((service) => (
            service.id !== id
        ))

        const projectUpdated = project
        
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(projectUpdated)
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className='project-details'>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className='details-container'>
                            <h1>Projeto: {project.name}</h1>
                            <button className='btn' onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                            {!showProjectForm ? (
                                <div className='project-info'>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className='project-info'>
                                    <Form handleSubmit={editPost} btnText='Concluir edição' projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className='service-form-container'>
                                <h2>Adicione um serviço:</h2>
                                <button className='btn' onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                                <div className='project-info'>
                                    {showServiceForm && <ServiceForm 
                                    handleSubmit={createService}
                                    btnText='Adicionar serviço' 
                                    projectData={project} />}
                                </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass='start'>
                                {services.length > 0 && 
                                services.map((service) => (
                                    <ServiceCard 
                                    id={service.id} 
                                    name={service.name} 
                                    cost={service.cost} 
                                    description={service.description} 
                                    key={service.id} 
                                    handleRemove={removeService} 
                                    />
                                ))}
                                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                        </Container>
                    </Container>
                </div>
            ) :
                <Loading />
            }
        </>
    )
}