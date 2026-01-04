import styles from './Home.module.css'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
    const [products, setProducts] = useState([])
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
                {isLight ? (
                    <Flashlight className={styles.colorMode} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.colorMode} onClick={() => setLight(!isLight)} />
                )}
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