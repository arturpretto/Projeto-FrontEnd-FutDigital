import { useEffect, useState } from 'react'
import styles from '../pages/Dashboard/Dashboard.module.css'
import { Loader2 } from 'lucide-react'

export default function Graphs() {
    const [isLoading, setLoading] = useState(true)
    const [faturamentoTotal, setTotal] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                const ordersResponse = await fetch(`${import.meta.env.VITE_API_URL}/orders`)
                const productsResponse = await fetch(`${import.meta.env.VITE_API_URL}/products`)

                const orders = await ordersResponse.json()
                const products = await productsResponse.json()

                const productMap = {}

                let total = 0

                products.forEach(product => {
                    productMap[product.id] = product
                })

                orders.forEach(order => {
                    const product = productMap[order.productId]

                    if (product && order.status === 'completed') {
                        total += product.price
                    }
                })

                setTotal(total)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            {isLoading ? (
                <Loader2 className={styles.spanLoading} />
            ) : (
                <div className={styles.dashboardContainer}>
                    <div>
                        <h3>
                            💰 Faturamento Total
                        </h3>
                        <p>
                            R$ {faturamentoTotal.toFixed(2)}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}