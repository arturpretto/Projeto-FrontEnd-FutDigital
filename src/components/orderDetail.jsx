import { useState, useEffect } from "react";
import styles from '../pages/Orders/Orders.module.css'

export default function OrderDetail({ id, date, status, productId }) {
    const [product, setProduct] = useState({})

    const statusFormat = {
        pending: "Solicitado",
        completed: "Concluído",
        denied: "Negado",
        accepted: "Aceito"
    }

    const statusColors = {
        pending: "orange",
        completed: "green",
        denied: "red",
        accepted: "yellow"
    }

    useEffect(() => {
        if (productId) {
            async function getProduct() {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
                    const productFound = await response.json()

                    setProduct(productFound)
                } catch (error) {
                    console.error(error)
                }
            }

            getProduct()
        }
    }, [productId])

    return (
        <div className={styles.orderDetails}>
            {product && (
                <div key={id} className={styles.details}>
                    <h1>{product.name}</h1>
                    <h2>{product.price}</h2>
                    <p>
                        {date ? new Intl.DateTimeFormat('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            timeZone: 'UTC'
                        }).format(new Date(date)) : 'Carregando data...'}
                    </p>
                    <p style={{ color: statusColors[status], fontWeight: 'bold' }}>
                        {statusFormat[status]}
                    </p>
                </div>
            )}
        </div>
    )
}