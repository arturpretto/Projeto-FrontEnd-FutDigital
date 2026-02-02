import styles from './Admin.module.css'
import nav from '../../styles/Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { User, House } from 'lucide-react'
import OrderCard from '../../components/orderCard'

export default function Admin() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')
    const [isMenu, setMenu] = useState(false)
    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])

    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')

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
        if (!userId) {
            navigate('/login')
        }
    }, [userId])

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

    useEffect(() => {
        async function getOrders() {

            try {
                const response = await fetch('http://localhost:3000/orders')
                const ordersFound = await response.json()

                const sort = ordersFound.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 15)

                setOrders(sort)
            } catch (error) {
                console.error(error)
            }
        }

        getOrders()
    }, [])

    return (
        <>
            <header>
                <nav>
                    <Link to='/services' className={nav.homeLink}><House size={48} /></Link>
                </nav>

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
            </header>

            <div className={styles.bg}>
                <div className={styles.adminContainer}>
                    <main className={styles.ordersList}>
                        {orders.map(order => (
                            <OrderCard key={order.id} id={order.id} productId={order.productId} date={order.date} status={order.status} />
                        ))}
                    </main>
                </div>
            </div>
        </>
    )
}