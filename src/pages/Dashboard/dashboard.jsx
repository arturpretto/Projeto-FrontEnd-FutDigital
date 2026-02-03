import styles from './Dashboard.module.css'
import Graphs from '../../components/graphs'
import NavBar from '../../components/navBar'

export default function Dashboard() {
    return (
        <>
            <header>
                <NavBar />
            </header>

            <div className={styles.bg}>
                <main className={styles.dashboardContainer}>
                    <h1 className={styles.dashboardTitle}>Dashboard Faturamento</h1>
                    <Graphs />
                </main>
            </div>
        </>
    )
}