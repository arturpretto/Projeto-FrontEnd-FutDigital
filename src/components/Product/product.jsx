import styles from './Product.module.css'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Product() {
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

    useEffect(() => {
        localStorage.setItem('mode', isLight ? 'light' : 'dark')
        
        if (isLight) {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }, [isLight])

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
                    <Link to='/services'><button className={styles.homeButton}>HOME</button></Link>
                </nav>
                {isLight ? (
                    <Flashlight className={styles.colorMode} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.colorMode} onClick={() => setLight(!isLight)} />
                )}
            </header>
            <div className={styles.bg}>
                <div className={styles.detailsList}>
                    {product && (
                        <div key={product.id} className={styles.details}>
                            <h1>{product.title}</h1>
                            <p>{product.body}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}