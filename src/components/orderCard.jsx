import styles from '../pages/Orders/Orders.module.css'
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function OrderCard({ id, productId, date, status }) {
    const [product, setProduct] = useState(null)

    const statusFormat = {
        pending: "Solicitado",
        completed: "Concluído",
        denied: "Negado"
    }

    const statusColors = {
        pending: "orange",
        completed: "green",
        denied: "red"
    }

    useEffect(() => {
        async function getProduct() {
            const response = await fetch(`http://localhost:3000/products/${productId}`);
            const productFound = await response.json();

            setProduct(productFound)
        }

        if (productId) getProduct()
    }, [productId])

    if (!product) {
        return (
            <article className={styles.order}>
                <Loader2 className={styles.spanLoading} />
            </article>
        )
    }

    return (
        <article key={id} className={styles.order}>
            {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(product.price)} <br></br>
            {new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(new Date(date))} <br></br>
            <p style={{ color: statusColors[status], fontWeight: 'bold' }}>
                {statusFormat[status]}
            </p>
        </article>
    )
}