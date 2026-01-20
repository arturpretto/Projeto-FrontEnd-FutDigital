import { useNavigate } from 'react-router-dom'
import styles from '../pages/Home/Home.module.css'

export default function ProductCard({ id, title, price }) {
    const navigate = useNavigate()

    const seeDetails = () => {
        navigate(`/product/${id}`)
    }

    return (
        <article key={id} className={styles.product} onClick={seeDetails}>
            <p><b>{title}</b></p>
            <p>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(price)}
            </p>
        </article>
    )
}