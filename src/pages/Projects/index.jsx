import './styles.css';

import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

import Message from "../../components/Message";
import Container from '../../components/Container';
import Loading from '../../components/Loading';
import LinkButton from '../../components/LinkButton';
import ProjectCard from '../../components/ProjectCard';

export default function Projects() {

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectsMessage, setProjectsMessage] = useState('');

    const location = useLocation();
    let message = ''
    if(location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(resp => resp.json())
                .then((data) => {
                    setProjects(data);
                    setRemoveLoading(true);
                })
                .catch(err => console.log(err));
        }, 300);
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter(project => project.id !== id))
            setProjectsMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='project-container'>
            <div className='title-container'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar projeto' />
            </div>
            {message && <Message type='success' msg={message} />}
            {projectsMessage && <Message type='success' msg={projectsMessage} />}
            <Container customClass='start'>
                {projects.length > 0 && (
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id} 
                            key={project.id} 
                            name={project.name} 
                            budget={project.budget} 
                            category={project?.category?.name}
                            handleRemove={removeProject} 
                        />
                    )
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}