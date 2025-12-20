import styles from '../styles/App.module.css'
import { Link } from 'react-router-dom'
import { Power } from 'lucide-react'

export default function Signup() {
    const mode = () => {
        document.body.classList.toggle('light')
    }

    return (
        <>
            <header>
                <Power className={styles.power} onClick={mode} />
            </header>
            <div className={styles.bg}>
                <div className={styles.container}>
                    <form className={styles.form}>
                        <h1>CADASTRO</h1>

                        <input type='text' placeholder='Nome...' />
                        <input type='text' placeholder='Email...' />
                        <input type='password' placeholder='Senha...' />

                        <button type='submit'>CADASTRAR-SE</button>

                        <h3>Já tem uma conta? <Link to='/'><a>ENTRAR</a></Link></h3>
                    </form>
                </div>
            </div>
        </>
    )
}