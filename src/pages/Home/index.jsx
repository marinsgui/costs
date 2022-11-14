import LinkButton from '../../components/LinkButton'
import './styles.css'

export default function Home() {
    return (
        <section className='home-container'>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <LinkButton to='/newproject' text='Criar projeto' />
            <img src="src\assets\savings.svg" alt="Costs" />
        </section>
    )
}