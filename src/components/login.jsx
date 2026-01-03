import styles from '../styles/App.module.css'
import { Link } from 'react-router-dom'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Login() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

    useEffect(() => {
        localStorage.setItem('mode', isLight ? 'light' : 'dark')
        
        if (isLight) {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }, [isLight])

    return (
        <>
            <header>
                <nav>
                    <Link to='/services'><button className={styles.navBtn}>HOME</button></Link>
                </nav>
                {isLight ? (
                    <Flashlight className={styles.power} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.power} onClick={() => setLight(!isLight)} />
                )}
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