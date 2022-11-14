import Input from '../Input';
import Select from '../Select';
import Submit from '../Submit';
import './styles.css';

export default function Form({ btnText }) {
    return (
        <form className='form'>
            <Input 
            type='text' 
            text='Nome do projeto' 
            name='name' 
            placeholder='Insira o nome do seu projeto' 
            />

            <Input 
            type='number' 
            text='Orçamento do projeto'
            name='budget' 
            placeholder='Insira o orçamento total' 
            />

            <Select name='category-id' text='Selecione a categoria' />

            <Submit text={btnText} />
        </form>
    )
}