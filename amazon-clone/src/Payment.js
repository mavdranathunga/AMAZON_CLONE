import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import CheckoutProducts from './CheckoutProducts';
import './Payment.css';
import { useStateValue } from './StateProvider'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';


function Payment() {

    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setdisabled] = useState(true);
    const [clientSecret, setClientsecret] = useState(true);

    useEffect(() => {

        const getClientsecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientsecret(response.data.clientSecret)
        }

        getClientsecret();
    }, [basket])

    const handleSubmit = async (event) => {
        event.preventdefault();
        setProcessing(true);

        const payload =  await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            history.replaceState('./orders')
        })
    }

    const handlechange = event => {
        setdisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment_container'>

                <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>

                {/* payment section - delivery address */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>287/1, ullalapola, divulapitiya</p>
                        <p>Sri Lanka</p>
                    </div>
                </div>


                {/* payment section - Review item */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items & Delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map (item => (
                            <CheckoutProducts
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* payment section - Payment method  */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handlechange}/>

                            <div className='payment_priceContainer'>
                            <CurrencyFormat
                            renderText={(value) => (
                                <h3>Order Total: {value}</h3>
                            )}
                            decimalScale={2}
                            value={getBasketTotal(basket)} 
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Proccessing</p> : "Buy Now"}</span>
                            </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
