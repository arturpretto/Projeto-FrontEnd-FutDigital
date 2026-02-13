import styles from './Orders.module.css'
import { useState, useEffect } from 'react'
import OrderCard from '../../components/orderCard'
import NavBar from '../../components/navBar'
import { Loader2 } from 'lucide-react'

export default function Orders() {
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        async function getOrders() {
            const id = localStorage.getItem('userId')

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/orders?userId=${id}`)
                const ordersFound = await response.json()

                setOrders(ordersFound)
            } catch (error) {
                console.error(error)
            }
        }

        getOrders()
    }, [])

    if (!orders) {
        return (
            <article className={styles.order}>
                <Loader2 className={styles.spanLoading} />
            </article>
        )
    }

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
                            <OrderCard key={order.id} id={order.id} product={order.product} date={order.date} status={order.status} />
                        ))}
                    </main>
                </div>
            </div>
        </>
    )
}