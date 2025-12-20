import styles from '../styles/App.module.css'
import { Link } from 'react-router-dom'
import { Power } from 'lucide-react'

export default function Login() {
    const mode = () => {
        document.body.classList.toggle('light')
    }

    return (
        <>
            <header>
                <nav>
                    <Link to='/services'><button className={styles.navBtn}>HOME</button></Link>
                </nav>
                <Power className={styles.power} onClick={mode} />
            </header>
            <div className={styles.bg}>
                <div className={styles.container}>
                    <form className={styles.form}>
                        <h1>LOG IN</h1>

                        <input type='text' placeholder='Email...' />
                        <input type='password' placeholder='Senha...' />

                        <button type='submit'>ENTRAR</button>

                        <h3>Não tem cadastro? <Link to='/signup'><a>CADASTRAR-SE</a></Link></h3>
                    </form>
                </div>
            </div>
        </>
    )
}