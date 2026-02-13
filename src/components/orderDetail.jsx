import styles from '../pages/Orders/Orders.module.css'

export default function OrderDetail({ id, date, status, product }) {

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
        accepted: "#edeb53"
    }

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