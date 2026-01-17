import styles from './Details.module.css'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductDetail from '../../components/productDetail'

export default function Details() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

    const { id } = useParams()


    useEffect(() => {
        localStorage.setItem('mode', isLight ? 'light' : 'dark')

        if (isLight) {
            document.body.classList.add('light')
        } else {
            document.body.classList.remove('light')
        }
    }, [isLight])

    return (
        <>
            <header>
                <nav>
                    <Link to='/'><button className={styles.homeBtn}>HOME</button></Link>
                </nav>
                {isLight ? (
                    <Flashlight className={styles.colorMode} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.colorMode} onClick={() => setLight(!isLight)} />
                )}
            </header>
            <div className={styles.bg}>
                <main className={styles.container}>
                    <ProductDetail />
                    <Link to={`/checkout/${id}`} className={styles.orderBtn}>CONTRATAR</Link>
                </main>
            </div>
        </>
    )
}