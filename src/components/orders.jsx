import styles from '../styles/App.module.css'
import { Power } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Orders() {
    const mode = () => {
        document.body.classList.toggle('light')
    }

    return (
        <>
            <header>
                <Power className={styles.power} onClick={mode} />
            </header>
        </>
    )
}