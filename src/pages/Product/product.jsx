import styles from './Product.module.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductDetail from '../../components/productDetail'
import NavBar from '../../components/navBar'

export default function ProductDetails() {
    const { id } = useParams()

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