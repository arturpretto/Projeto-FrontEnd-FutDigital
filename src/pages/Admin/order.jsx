import { useNavigate, useParams } from 'react-router-dom'
import styles from './Admin.module.css'
import nav from '../../styles/Nav.module.css'
import OrderDetail from '../../components/orderDetail'
import { useEffect, useState } from 'react'
import { Link } from 'lucide-react'
import { House, User } from 'lucide-react'

export default function Order() {
    const [order, setOrder] = useState({})
    const [isMenu, setMenu] = useState(false)
    const [user, setUser] = useState({})
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

    const navigate = useNavigate()

    const { id } = useParams()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        localStorage.setItem('mode', isLight ? 'light' : 'dark')

        if (isLight) {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }, [isLight])

    useEffect(() => {
        async function getOrder() {
            try {
                const response = await fetch(`http://localhost:3000/orders/${id}`)
                const orderFound = await response.json()

                setOrder(orderFound)
            } catch (error) {
                console.error(error)
            }
        }

        getOrder()
    }, [id])

    useEffect(() => {
        if (userId) {
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
        } else {
            navigate('/login')
        }
    }, [userId])

    const logout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
    }

    const accept = async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: order.userId,
                    productId: order.productId,
                    date: order.date,
                    status: "accepted"
                })
            });

            if (response.ok) {
                navigate('/admin')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deny = async () => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: order.userId,
                    productId: order.productId,
                    date: order.date,
                    status: "denied"
                })
            });

            if (response.ok) {
                navigate('/admin')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header>
                <nav>
                    <Link to='/' className={nav.homeLink}><House size={48} /></Link>
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
                    <OrderDetail id={id} date={order.date} status={order.status} productId={order.productId} />

                    <button onClick={accept}>ACEITAR</button>
                    <button onClick={deny}>RECUSAR</button>
                </div>
            </div>
        </>
    )
}