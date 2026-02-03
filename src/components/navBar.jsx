import styles from '../styles/Nav.module.css'
import { User, Store } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
    const [isMenu, setMenu] = useState(false)
    const [user, setUser] = useState({})
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

    const userId = localStorage.getItem('userId')

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('userId')
        navigate('/')
    }

    useEffect(() => {
        localStorage.setItem('mode', isLight ? 'light' : 'dark')

        if (isLight) {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }, [isLight])

    useEffect(() => {
        if (!userId) return

        async function getUser() {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`);
                const userFound = await response.json();

                setUser(userFound);
            } catch (error) {
                console.error("Erro ao buscar usuário", error);
            }
        }

        getUser()
    }, [userId])

    return (
        <>
            <nav>
                <Link to='/services' className={styles.homeLink}><Store size={48} className={styles.homeIcon} /></Link>
            </nav>

            <div className={styles.profileContainer}>
                <div className={styles.profileIcon} onClick={() => setMenu(!isMenu)}>
                    <User size={48} />
                </div>

                {isMenu && (
                    <div className={styles.dropdown}>
                        <ul>
                            {userId ? <li><Link to='/orders' className={styles.ordersLink}>Meus pedidos</Link></li> : ''}
                            <li onClick={() => setLight(!isLight)}>Tema</li>
                            {user?.role === "admin" && (<li onClick={() => navigate('/admin')}>Dashboard Admin</li>)}
                            {userId ?
                                (<li onClick={logout} className={styles.signLink}>Sair</li>) :
                                (<li><Link to='/login' className={styles.signLink}>Entrar</Link></li>)}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}