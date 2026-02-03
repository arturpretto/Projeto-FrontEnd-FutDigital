import styles from './Product.module.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductDetail from '../../components/productDetail'
import NavBar from '../../components/navBar'

export default function ProductDetails() {
    const userId = localStorage.getItem('userId')

    const { id } = useParams()

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
                <main className={styles.detailsContainer}>
                    <ProductDetail id={id} />
                    <Link to={`/checkout/${id}`} className={styles.orderBtn}>COMPRAR</Link>
                </main>
            </div>
        </>
    )
}