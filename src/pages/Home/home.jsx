import styles from './Home.module.css'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { mockProducts } from '../../services/mockApi';

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
        setProducts(mockProducts)
    }, [])

    return (
        <>
            <header>
                <nav>
                    <Link to='/login'><button className={styles.loginBtn}>ENTRAR</button></Link>
                </nav>

                {isLight ? (
                    <Flashlight className={styles.colorMode} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.colorMode} onClick={() => setLight(!isLight)} />
                )}
            </header>
            <div className={styles.bg}>
                <div className={styles.services}>
                    <div className={styles.servicesList}>
                        {products.map(products => (
                            <div key={products.id}>
                                <p>{products.title} <Link to={`/product/${products.id}`}><a>VER</a></Link></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}