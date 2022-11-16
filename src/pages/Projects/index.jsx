import './styles.css';

import { useLocation } from "react-router-dom";

import Message from "../../components/Message";
import Container from '../../layout/Container';
import LinkButton from '../../components/LinkButton';
import ProjectCard from '../../components/ProjectCard';
import { useState, useEffect } from 'react';

export default function Projects() {

    const [projects, setProjects] = useState([]);

    const location = useLocation();
    let message = ''
    if(location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json())
        .then(data => setProjects(data))
        .catch(err => console.log(err));
    }, [])

    return (
        <div className='project-container'>
            <div className='title-container'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar projeto' />
            </div>
            {message && <Message type='success' msg={message} />}
            <Container customClass='start'>
                {projects.length > 0 && (
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id} 
                            key={project.id} 
                            name={project.name} 
                            budget={project.budget} 
                            category={project?.category?.name} 
                        />
                    )
                ))}
            </Container>
        </div>
    )
}