import styles from '../styles/App.module.css'
import { Power } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Details() {
    const mode = () => {
        document.body.classList.toggle('light')
    }

    const [product, setProduct] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            const api = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            const response = await api.json()
            setProduct(response)
        }

        getProduct()
    }, [id])

    return (
        <>
            <header>
                <nav>
                    <Link to='/services'><button className={styles.navBtn}>HOME</button></Link>
                </nav>
                <Power className={styles.power} onClick={mode} />
            </header>
            <div className={styles.bg}>
                <div className={styles.details}>
                    {product && (
                        <div key={product.id} className={styles.detailed}>
                            <h1>{product.title}</h1>
                            <p>{product.body}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}