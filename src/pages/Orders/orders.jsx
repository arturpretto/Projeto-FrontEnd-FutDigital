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

    return (
        <>
            <header>
                <nav>
                    <Link to='/' className={nav.homeLink}><House className={nav.homeBtn} /> <p>HOME</p></Link>
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