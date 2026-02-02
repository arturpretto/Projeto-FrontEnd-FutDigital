import styles from './Services.module.css'
import nav from '../../styles/Nav.module.css'
import { User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard'

export default function Services() {
    const [products, setProducts] = useState([])
    const [isLight, setLight] = useState(localStorage.getItem('mode') === 'light')
    const [isMenu, setMenu] = useState(false)
    const [user, setUser] = useState({})

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

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`);
                const userFound = await response.json();
                setUser(userFound);
            } catch (error) {
                console.error("Erro ao buscar usuário", error);
            }
        }

        getUser()
    }, [userId])

    return (
        <>
            <header>
                <div className={nav.profileContainer}>
                    <div className={nav.profileIcon} onClick={() => setMenu(!isMenu)}>
                        <User size={48} />
                    </div>

                    {isMenu && (
                        <div className={nav.dropdown}>
                            <ul>
                                {userId ? <li><Link to='/orders' className={nav.ordersLink}>Meus pedidos</Link></li> : ''}
                                <li onClick={() => setLight(!isLight)}>Tema</li>
                                {user?.role === "admin" && (<li onClick={() => navigate('/admin')}>Painel Admin</li>)}
                                {userId ?
                                    (<li onClick={logout} className={nav.signLink}>Sair</li>) :
                                    (<li><Link to='/login' className={nav.signLink}>Entrar</Link></li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </header>

            <div className={styles.bg}>
                <div className={styles.servicesContainer}>
                    <main className={styles.servicesList}>
                        {products.map(product => (
                            <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} />
                        ))}
                    </main>
                </div>
            </div>
        </>
    )
}