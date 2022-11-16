import './styles.css';

import { Link } from 'react-router-dom';
import Container from '../Container';

export default function Navbar() {
    return (
        <nav className='navbar'>
            <Container>
                <Link to='/'>
                    <img src="src\assets\costs_logo.png" alt="Logo Costs" />
                </Link>
                <ul className='list'>
                    <li className='item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='item'>
                        <Link to='/projects'>Projetos</Link>
                    </li>
                    <li className='item'>
                        <Link to='/company'>Empresa</Link>
                    </li>
                    <li className='item'>
                        <Link to='/contact'>Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}