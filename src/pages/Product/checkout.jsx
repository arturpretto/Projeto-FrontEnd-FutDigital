import styles from './Product.module.css'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Loader2, Check, PrinterCheck } from 'lucide-react'
import ProductDetail from '../../components/productDetail'
import NavBar from '../../components/navBar'

export default function Checkout() {
    const [showCheck, setCheck] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [product, setProduct] = useState({})

    const { id } = useParams()
    const userId = localStorage.getItem('userId')

    const dateRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
                const productFound = await response.json();

                setProduct(productFound);
            } catch (error) {
                console.error(error);
            }
        }

        getProduct()
    }, [])

    const handler = async (event) => {
        event.preventDefault()

        setLoading(true)

        if (userId) {
            try {
                if (dateRef.current && dateRef.current.value) {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId: userId,
                            date: dateRef.current.value,
                            createdAt: new Date().toISOString(),
                            status: "pending",
                            product: {
                                id: id,
                                name: product.name,
                                price: Number(product.price)
                            }
                        })
                    })

                    if (response.ok) {
                        setTimeout(() => {
                            setLoading(false)
                            setCheck(true)
                            setVisible(false)
                        }, 1000)

                        setTimeout(() => navigate('/services'), 2000)
                    }
                } else {
                    setLoading(false)
                    setVisible(true)
                    setErrorMessage('Insira uma data válida')
                }

            } catch (error) {
                setLoading(false)
                setVisible(true)
                setErrorMessage('Erro de conexão com o servidor')
            }
        } else {
            setTimeout(() => {
                setLoading(false)
                setVisible(true)
                setErrorMessage(<>Usuário não autenticado, efetue o <Link to='/login'>Login</Link></>)
            }, 1000)
        }
    }

    return (
        <>
            <header>
                <NavBar />
            </header>

            <div className={styles.bg}>
                <main className={styles.checkoutContainer}>
                    <ProductDetail id={id} />
                    <form className={styles.form} onSubmit={handler}>
                        <input type='date' ref={dateRef} />

                        <div className={`${styles.loginError} ${isVisible ? styles.visible : styles.hidden}`}>
                            <p>{errorMessage}</p>
                        </div>

                        <button type='submit'>{showCheck ? (
                            <Check className={styles.spanCheck} />
                        ) : isLoading ? (
                            <Loader2 className={styles.spanLoading} />
                        ) : 'COMPRAR'}</button>
                    </form>
                </main>
            </div>
        </>
    )
}