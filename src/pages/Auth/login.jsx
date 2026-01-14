import styles from './Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { mockUsers } from '../../services/usersApi'

export default function Login() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('mode', isLight ? 'light' : 'dark')

        if (isLight) {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }, [isLight])

    const handler = async (event) => {
        event.preventDefault()

        const email = document.getElementById('email')
        const password = document.getElementById('password')

        async function getUser() {
            const foundUser = mockUsers.find(u => u.email === email)

            if (foundUser.password === password) {
                localStorage.setItem('userId', foundUser.id)

                navigate('/')
            }
        }

        getUser()
    }

    return (
        <>
            <header>
                <nav>
                    <Link to='/'><button className={styles.homeBtn}>HOME</button></Link>
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
                        <h1>LOG IN</h1>

                        <input type='text' placeholder='Email...' id='email' />
                        <input type='password' placeholder='Senha...' id='password' />

                        <button type='submit' onSubmit={handler}>ENTRAR</button>

                        <h3>Não tem cadastro? <Link to='/signup'><a>CADASTRAR-SE</a></Link></h3>
                    </form>
                </div>
            </div>
        </>
    )
}