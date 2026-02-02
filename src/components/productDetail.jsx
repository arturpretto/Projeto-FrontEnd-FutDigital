import styles from '../pages/Product/Product.module.css'
import { useState, useEffect } from 'react'

export default function ProductDetail({ id }) {
    const [product, setProduct] = useState({})

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(`http://localhost:3000/products/${id}`);
                const productFound = await response.json();

                setProduct(productFound)
            } catch (error) {
                console.error(error)
            }
        }

        getProducts()
    }, [id])

    return (
        <div className={styles.productDetails}>
            {product && (
                <div key={product.id} className={styles.details}>
                    <h1>{product.name}</h1>
                    <p>{product.price}</p>
                </div>
            )}
        </div>
    )
}