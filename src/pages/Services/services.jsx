import styles from './Services.module.css'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard'
import NavBar from '../../components/navBar'

export default function Services() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
            const productsFound = await response.json();

            setProducts(productsFound)
        }

        getProducts()
    }, [])

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