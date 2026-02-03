import styles from './Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Flashlight, FlashlightOff, UserPen, Loader2, Check } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function Signup() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

    const [isVisible, setVisible] = useState(false)
    const [showCheck, setCheck] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const nameRef = useRef()
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

    const handler = (event) => {
        event.preventDefault()

        const credentials = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            role: "customer"
        }

        async function getUser() {
            const responseCheck = await fetch(`${import.meta.env.VITE_API_URL}/users?email=${emailRef.current.value}`)

            const usersFound = await responseCheck.json();
            const credentialsCheck = document.getElementById('credentialsCheck')

            setLoading(true)

            try {
                if (usersFound.length > 0) {
                    setTimeout(() => {
                        setLoading(false)
                        setVisible(true)
                        credentialsCheck.textContent = 'E-mail já registrado'
                    }, 1000)

                    return
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                })

                if (response.ok) {
                    setTimeout(() => {
                        setLoading(false)
                        setCheck(true)
                    }, 1000)

                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)

                }
            } catch (error) {
                alert('Erro ' + error)
            } finally {
                setLoading(false)
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
                        <UserPen size={48} />

                        <h1>CADASTRO</h1>

                        <input type='text' placeholder='Nome...' ref={nameRef} />
                        <input type='text' placeholder='Email...' ref={emailRef} />
                        <input type='password' placeholder='Senha...' ref={passwordRef} />

                        <div className={`${styles.credentialsError} ${isVisible ? styles.visible : styles.hidden}`}>
                            <p id='credentialsCheck'></p>
                        </div>

                        <button type='submit'>
                            {showCheck ? (
                                <Check className={styles.spanCheck} />
                            ) : isLoading ? (
                                <Loader2 className={styles.spanLoading} />
                            ) : 'CADASTRAR-SE'}
                        </button>

                        <h3>Já tem uma conta? <Link to='/login'><a>ENTRAR</a></Link></h3>
                        <h3><Link to='/services'>Entrar como visitante</Link></h3>
                    </form>
                </main>
            </div>
        </>
    )
}