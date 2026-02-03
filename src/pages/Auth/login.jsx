import styles from './Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Flashlight, FlashlightOff, User, Check, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Login() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

    const [isVisible, setVisible] = useState(false)
    const [showCheck, setCheck] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const emailRef = useRef()
    const passwordRef = useRef()

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

        const email = emailRef.current.value
        const password = passwordRef.current.value

        async function getUser() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users?email=${email}`);
            const usersFound = await response.json();
            const credentialsCheck = document.getElementById('credentialsCheck')

            setLoading(true)

            if (usersFound.length > 0 && usersFound[0].password === password) {
                localStorage.setItem('userId', usersFound[0].id)

                setTimeout(() => {
                    setLoading(false)
                    setCheck(true)
                    setVisible(false)
                }, 1000)

                setTimeout(() => navigate('/services'), 2000)

            } else {
                setTimeout(() => {
                    setLoading(false)
                    setVisible(true)
                    credentialsCheck.textContent = 'E-mail ou senha incorretos'
                }, 1000)

            }
        }

        getUser()
    }

    return (
        <>
            <header>
                <div className={styles.colorMode}>
                    {isLight ? (
                        <Flashlight onClick={() => setLight(!isLight)} size={48} />
                    ) : (
                        <FlashlightOff onClick={() => setLight(!isLight)} size={48} />
                    )}
                </div>
            </header>

            <div className={styles.bg}>
                <main className={styles.container}>
                    <form className={styles.form} onSubmit={handler}>
                        <User size={48} />

                        <h1>LOG IN</h1>

                        <input type='text' placeholder='Email...' id='email' ref={emailRef} />
                        <input type='password' placeholder='Senha...' id='password' ref={passwordRef} />

                        <div className={`${styles.credentialsError} ${isVisible ? styles.visible : styles.hidden}`}>
                            <p id='credentialsCheck'></p>
                        </div>

                        <button type='submit'>
                            {showCheck ? (
                                <Check className={styles.spanCheck} />
                            ) : isLoading ? (
                                <Loader2 className={styles.spanLoading} />
                            ) : 'ENTRAR'}
                        </button>

                        <h3>Não tem cadastro? <Link to='/signup'><a>CADASTRAR-SE</a></Link></h3>
                        <h3><Link to='/services'>Entrar como visitante</Link></h3>
                    </form>
                </main>
            </div>
        </>
    )
}