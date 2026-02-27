import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
import { MoveRight } from 'lucide-react'

export default function Home() {

    const navigate = useNavigate()

    return (
        <>
            <nav className={styles.nav}>
                <button onClick={() => navigate('/login')} className={`${styles.landingBtn} ${styles.loginBtn}`}>ENTRAR</button>
                <button onClick={() => navigate('/signup')} className={styles.landingBtn}>CADASTRAR-SE</button>
            </nav>
            <main className={styles.bg}>
                <h1>Plataforma Web de Contratação de Serviços</h1>
                <h3>
                    React (Vite) <br></br>
                    Json Server <br></br>
                    Vercel <br></br>
                    Render
                </h3>
                <button onClick={() => navigate('/services')} className={styles.catalogBtn}>VER CATÁLOGO <MoveRight /></button>
            </main>
        </>
    )
}