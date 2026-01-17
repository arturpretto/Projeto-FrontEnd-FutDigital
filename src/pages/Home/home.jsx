import styles from './Home.module.css'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard'

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
        async function getProducts() {
            const response = await fetch(`http://localhost:3000/products`);
            const productsFound = await response.json();

            setProducts(productsFound)
        }

        getProducts()
    }, [])

    return (
        <>
            <header>
                <nav>
                    <Link to='/login'><button className={styles.loginBtn}>ENTRAR</button></Link>
                    <Link to='/orders'><button className={styles.loginBtn}>PEDIDOS</button></Link>
                </nav>

                {isLight ? (
                    <Flashlight className={styles.colorMode} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.colorMode} onClick={() => setLight(!isLight)} />
                )}
            </header>
            <div className={styles.bg}>
                <div className={styles.servicesContainer}>
                    <main className={styles.servicesList}>
                        {products.map(product => (
                            <ProductCard id={product.id} title={product.title} />
                        ))}
                    </main>
                </div>
            </div>
        </>
    )
}