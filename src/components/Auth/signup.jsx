import styles from './Auth.module.css'
import { Link } from 'react-router-dom'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Signup() {
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
                    <Link to='/services'><button className={styles.homeButton}>HOME</button></Link>
                </nav>
                {isLight ? (
                    <Flashlight className={styles.colorMode} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.colorMode} onClick={() => setLight(!isLight)} />
                )}
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