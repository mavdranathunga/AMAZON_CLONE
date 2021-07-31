import { Link } from 'react-router-dom';
import React from 'react'
import CheckoutProducts from './CheckoutProducts';
import './Payment.css'
import Product from './Product';
import { useStateValue } from './StateProvider'



function Payment() {

    const [{basket, user}, dispatch] = useStateValue();

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
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
