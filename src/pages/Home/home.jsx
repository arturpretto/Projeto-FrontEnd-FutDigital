import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {

    const navigate = useNavigate()

    return (
        <main className={styles.bg}>
            <button onClick={() => navigate('/login')} className={styles.landingBtn}>ENTRAR</button>
            <button onClick={() => navigate('/signup')} className={styles.landingBtn}>CADASTRAR-SE</button>
            <button onClick={() => navigate('/services')} className={styles.landingBtn}>VER CATÁLOGO</button>
        </main>
    )
}