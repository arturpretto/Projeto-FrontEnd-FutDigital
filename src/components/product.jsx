import styles from '../pages/Product/Details.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { mockProducts } from '../services/mockApi';

export default function Product() {
    const [product, setProduct] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        async function loadProducts() {
            const foundProduct = mockProducts.find(p => p.id === Number(id));
            setProduct(foundProduct);
        }

        loadProducts()
    }, [id])

    return (
        <div className={styles.product}>
            {product && (
                <div key={product.id} className={styles.details}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                </div>
            )}
        </div>
    )
}