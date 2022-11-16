import './styles.css';

import loading from '../../assets/loading.svg';

export default function Loading() {
    return (
        <div className='loader-container'>
            <img className='loader' src={loading} alt="loading" />
        </div>
    )
}