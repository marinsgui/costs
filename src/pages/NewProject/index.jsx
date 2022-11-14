import Form from '../../components/Form';
import './styles.css';

export default function NewProject() {
    return (
        <div className='newproject-container'>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Form btnText='Criar Projeto' />
        </div>
    )
}