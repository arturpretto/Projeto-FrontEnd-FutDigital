import styles from './Orders.module.css'
import nav from '../../styles/Nav.module.css'
import { House, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OrderCard from '../../components/orderCard'

export default function Orders() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')
    const [orders, setOrders] = useState([])
    const [isMenu, setMenu] = useState(false)
    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')

    const logout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
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
        async function getOrders() {
            const id = localStorage.getItem('userId')

            const response = await fetch(`http://localhost:3000/orders?userId=${id}`)
            const ordersFound = await response.json()

            setOrders(ordersFound)
        }

        getOrders()
    }, [])

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
                ) : () => navigate('/login')}
            </header>

            <div className={styles.bg}>
                <div className={styles.ordersContainer}>
                    <main className={styles.ordersList}>
                        {orders.map(order => (
                            <OrderCard id={order.id} productId={order.productId} date={order.date} status={order.status} />
                        ))}
                    </main>
                </div>
            </div>
        </>
    )
}