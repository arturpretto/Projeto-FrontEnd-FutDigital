import styles from './Admin.module.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OrderCard from '../../components/orderCard'
import NavBar from '../../components/navBar'

export default function Admin() {
    const [orders, setOrders] = useState([])

    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
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
                <NavBar />
            </header>

            <div className={styles.bg}>
                <div className={styles.adminContainer}>
                    <h1 className={styles.adminTitle}>Dashboard Admin</h1>
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