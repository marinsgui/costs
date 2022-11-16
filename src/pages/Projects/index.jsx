import './styles.css';

import { useLocation } from "react-router-dom";

import Message from "../../components/Message";
import Container from '../../layout/Container';
import LinkButton from '../../components/LinkButton';

export default function Projects() {

    const location = useLocation();
    let message = ''
    if(location.state) {
        message = location.state.message;
    }

    return (
        <div className='project-container'>
            <div className='title-container'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar projeto' />
            </div>
            {message && <Message type='success' msg={message} />}
            <Container customClass='start'>
                <p>projetos</p>
            </Container>
        </div>
    )
}