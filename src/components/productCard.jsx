import { useNavigate } from 'react-router-dom'
import styles from '../pages/Product/Product.module.css'

export default function ProductCard({ id, name, price }) {
    const navigate = useNavigate()

    return (
        <article key={id} className={styles.product} onClick={() => navigate(`/product/${id}`)}>
            <p><b>{name}</b></p>
            <p>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price)}
            </p>
        </article>
    )
}