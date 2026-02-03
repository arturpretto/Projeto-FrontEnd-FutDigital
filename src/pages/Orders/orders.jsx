import styles from './Orders.module.css'
import { useState, useEffect } from 'react'
import OrderCard from '../../components/orderCard'
import NavBar from '../../components/navBar'

export default function Orders() {
    const [orders, setOrders] = useState([])

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        async function getOrders() {
            const id = localStorage.getItem('userId')

            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders?userId=${id}`)
            const ordersFound = await response.json()

            setOrders(ordersFound)
        }

        getOrders()
    }, [])

    useEffect(() => {
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
    }, [userId])

    return (
        <>
            <header>
                <NavBar />
            </header>

            <div className={styles.bg}>
                <div className={styles.ordersContainer}>
                    <h1 className={styles.ordersTitle}>Meus Pedidos</h1>
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