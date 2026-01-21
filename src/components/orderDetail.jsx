import { useState, useEffect } from "react";
import styles from '../pages/Orders/Orders.module.css'

export default function OrderDetail({ id, date, status, productId}) {
    const [product, setProduct] = useState({})

    useEffect(() => {
        if (productId) {
            async function getProduct() {
                try {
                    const response = await fetch(`http://localhost:3000/products/${productId}`)
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
                    <h1>{product.title}</h1>
                    <h2>{product.price}</h2>
                    <p>{date}</p>
                    <p>{status}</p>
                </div>
            )}
        </div>
    )
}