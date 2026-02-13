import styles from '../pages/Orders/Orders.module.css'
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderCard({ id, product, date, status }) {
    const navigate = useNavigate()

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
        accepted: "#a6a43a"
    }

    if (!product) {
        return (
            <article className={styles.order}>
                <Loader2 className={styles.spanLoading} />
            </article>
        )
    }

    return (
        <article key={id} className={styles.order} onClick={() => navigate(`/order/${id}`)}>
            <p>{product.name}</p>
            <p>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(product.price)}
            </p>
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
        </article>
    )
}