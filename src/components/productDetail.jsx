import styles from '../pages/Product/Details.module.css'
import { useState, useEffect } from 'react'

export default function ProductDetail({ id }) {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`http://localhost:3000/products/${id}`);
            const productFound = await response.json();

            setProduct(productFound)
        }

        getProducts()
    }, [id])

    return (
        <div className={styles.productDetails}>
            {product && (
                <div key={product.id} className={styles.details}>
                    <h1>{product.title}</h1>
                    <p>{product.price}</p>
                </div>
            )}
        </div>
    )
}