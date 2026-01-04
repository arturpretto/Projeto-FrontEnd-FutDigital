import styles from './Admin.module.css'
import { Flashlight, FlashlightOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Admin() {
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
                {isLight ? (
                    <Flashlight className={styles.colorMode} onClick={() => setLight(!isLight)} />
                ) : (
                    <FlashlightOff className={styles.colorMode} onClick={() => setLight(!isLight)} />
                )}
            </header>
        </>
    )
}