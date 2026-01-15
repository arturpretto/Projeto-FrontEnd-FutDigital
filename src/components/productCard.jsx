import { useNavigate } from 'react-router-dom'
import styles from '../pages/Home/Home.module.css'

export default function ProductCard({ id, title }) {
    const navigate = useNavigate()

    const seeDetails = () => {
        navigate(`/product/${id}`)
    }

    return (
        <div key={id} className={styles.product} onClick={seeDetails}>
            <p>{title}</p>
        </div>
    )
}