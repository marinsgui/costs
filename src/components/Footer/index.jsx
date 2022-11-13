import './styles.css';

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className='footer'>
            <ul className='social-list'>
                <li>
                    <FaFacebook />
                </li>
                <li>
                    <FaInstagram />
                </li>
                <li>
                    <FaLinkedin />
                </li>
            </ul>

            <p className='copyright'><span>Costs</span> &copy; 2022</p>
        </footer>
    )
}