import './styles.css';

import { Link } from 'react-router-dom';

export default function LinkButton({ to, text }) {
    return (
        <Link to={to} className='btn'>
            {text}
        </Link>
    )
}