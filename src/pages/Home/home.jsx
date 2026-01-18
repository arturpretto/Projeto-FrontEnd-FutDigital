import styles from './Home.module.css'
import nav from '../../styles/Nav.module.css'
import { User, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard'

export default function Home() {
    const [products, setProducts] = useState([])
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')
    const [isMenu, setMenu] = useState(false)

    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')

    const logout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
    }

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
                {userId ? '' : (
                    <nav>
                        <Link to='/login' className={nav.loginLink}><LogIn className={nav.loginBtn} /> ENTRAR</Link>
                    </nav>
                )}

                {userId ? (
                    <div className={nav.profileContainer}>
                        <div className={nav.profileIcon} onClick={() => setMenu(!isMenu)}>
                            <User size={48} />
                        </div>

                        {isMenu && (
                            <div className={nav.dropdown}>
                                <ul>
                                    <li><Link to='/orders' className={nav.ordersLink}>Meus pedidos</Link></li>
                                    <li onClick={() => setLight(!isLight)}>Tema</li>
                                    <li className={nav.logout} onClick={logout}>Sair</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : ''}
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