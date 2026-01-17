import styles from '../pages/Product/Details.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ProductDetail() {
    const [product, setProduct] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`http://localhost:3000/products/${id}`);
            const productFound = await response.json();

            setProduct(productFound)
        }

        getProducts()
    }, [id])

    return (
        <main className={styles.productDetails}>
            {product && (
                <div key={product.id} className={styles.details}>
                    <h1>{product.title}</h1>
                    <p>{product.price}</p>
                </div>
            )}
        </main>
    )
}