import styles from './Product.module.css'
import nav from '../../styles/Nav.module.css'
import { House, User } from 'lucide-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductDetail from '../../components/productDetail'

export default function ProductDetails() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')
    const [isMenu, setMenu] = useState(false)
    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')

    const logout = () => {
        localStorage.removeItem('userId')
        navigate('/')
    }

    const { id } = useParams()

    useEffect(() => {
        localStorage.setItem('mode', isLight ? 'light' : 'dark')

        if (isLight) {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }, [isLight])

    useEffect(() => {
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
            <header>
                <nav>
                    <Link to='/services' className={nav.homeLink}><House size={48} /></Link>
                </nav>

                {userId ? (
                    <div className={nav.profileContainer}>
                        <div className={nav.profileIcon} onClick={() => setMenu(!isMenu)}>
                            <User size={48} />
                        </div>

                        {isMenu && (
                            <div className={nav.dropdown}>
                                <ul>
                                    {userId ? <li><Link to='/orders' className={nav.ordersLink}>Meus pedidos</Link></li> : ''}
                                    <li onClick={() => setLight(!isLight)}>Tema</li>
                                    {user?.role === "admin" && (<li onClick={() => navigate('/admin')}>Painel Admin</li>)}
                                    {userId ?
                                        (<li onClick={logout} className={nav.signLink}>Sair</li>) :
                                        (<li><Link to='/login' className={nav.signLink}>Entrar</Link></li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : ''}
            </header>

            <div className={styles.bg}>
                <main className={styles.detailsContainer}>
                    <ProductDetail id={id} />
                    <Link to={`/checkout/${id}`} className={styles.orderBtn}>CONTRATAR</Link>
                </main>
            </div>
        </>
    )
}