import styles from './Orders.module.css'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import OrderCard from '../../components/orderCard'

export default function Orders() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')
    const [orders, setOrders] = useState([])

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
                    <Link to='/'><button className={styles.homeBtn}>HOME</button></Link>
                </nav>
                {isLight ? (
                    <Flashlight className={styles.colorMode} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.colorMode} onClick={() => setLight(!isLight)} />
                )}
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