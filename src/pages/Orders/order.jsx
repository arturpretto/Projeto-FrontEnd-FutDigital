import { useNavigate, useParams } from 'react-router-dom'
import styles from './Orders.module.css'
import OrderDetail from '../../components/orderDetail'
import { useEffect, useState } from 'react'
import NavBar from '../../components/navBar'

export default function OrderDetails() {
    const [order, setOrder] = useState({})
    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const { id } = useParams()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        async function getOrder() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`)
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
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
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

    const accept = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${order.id}`, {
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${order.id}`, {
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

    const complete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${order.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: order.userId,
                    productId: order.productId,
                    date: order.date,
                    status: "completed"
                })
            });

            if (response.ok) {
                navigate('/admin')
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header>
                <NavBar />
            </header>

            <div className={styles.bg}>
                <div className={styles.orderBox}>
                    <OrderDetail key={order.id} id={order.id} date={order.date} status={order.status} productId={order.productId} />

                    {user?.role === 'admin' ?
                        (<div className={styles.orderBtn}>
                            {order.status === 'pending' ? (
                                <>
                                    <button onClick={accept}>ACEITAR</button>
                                    <button onClick={deny}>RECUSAR</button>
                                </>
                            ) : ''}
                            {order.status === 'accepted' ? <button onClick={complete}>CONCLUIR</button> : ''}
                        </div>) : ''}
                </div>
            </div>
        </>
    )
}