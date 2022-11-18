import './styles.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../../components/Loading';
import Container from '../../components/Container';
import Form from '../../components/Form';
import Message from '../../components/Message';

export default function Project() {

    const { id } = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
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
                })
                .catch(err => console.log(err));
        }, 300);
    }, [id]);

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project) {
        // budget validation

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
                    </Container>
                </div>
            ) :
                <Loading />
            }
        </>
    )
}