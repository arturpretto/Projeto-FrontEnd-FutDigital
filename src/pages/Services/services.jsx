import styles from './Services.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard'
import NavBar from '../../components/navBar'

export default function Services() {
    const [products, setProducts] = useState([])

    const userId = localStorage.getItem('userId')

    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
            const productsFound = await response.json();

            setProducts(productsFound)
        }

        getProducts()
    }, [])

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`);
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
                <NavBar />
            </header>

            <div className={styles.bg}>
                <div className={styles.servicesContainer}>
                    <h1 className={styles.servicesTitle}>Catálogo de Serviços</h1>
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