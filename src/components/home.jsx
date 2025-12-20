import styles from '../styles/App.module.css'
import { Power } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
    const mode = () => {
        document.body.classList.toggle('light')
    }

    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const api = await fetch('https://jsonplaceholder.typicode.com/posts')
            const response = await api.json()
            setProducts(response)
        }

        getProducts()
    }, [])

    return (
        <>
            <header>
                <Power className={styles.power} onClick={mode} />
            </header>
            <div className={styles.bg}>
                <div className={styles.services}>
                    <div className={styles.servicesList}>
                        {products.map(product => (
                            <div key={product.id}>
                                <p>{product.title} <Link to={`/services/${product.id}`}><a>VER</a></Link></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}