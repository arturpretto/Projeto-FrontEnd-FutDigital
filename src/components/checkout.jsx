import styles from '../pages/Product/Details.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flashlight, FlashlightOff } from 'lucide-react'
import Product from './product'

export default function Checkout() {
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')

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
                <div className={styles.container}>
                    <Product />
                    <form className={styles.form}>
                        <input type='text' placeholder='Sua rua...' />
                        <input type='text' placeholder='Número de residência...' />
                        <input type='date' />
                        <button type='submit'>CONTRATAR</button>
                    </form>
                </div>
            </div>
        </>
    )
}