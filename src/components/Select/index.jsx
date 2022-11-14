import './styles.css';

export default function Select({ text, name, options, handleOnChange, value }) {
    return (
        <div className='form-control'>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                <option>Selecione uma opção</option>
            </select>
        </div>
    )
}