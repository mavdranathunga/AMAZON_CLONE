import React from 'react'
import './CheckoutProducts.css'
import { useStateValue } from './StateProvider'

function CheckoutProducts({ id, image, title, price, rating}) {

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {
        //remove the item from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })

    }

    return (
        <div className='checkoutProducts'>
            <img className='checkoutProducts_image' src={image} />

            <div className='checkoutProducts_info'>
                <p className='checkoutProducts_title'>{title}</p>
                <p className='checkoutProducts_price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className='checkoutProducts_rating'>
                    {Array(rating)
                    .fill()
                    .map((_,i) => (<p>⭐</p>))}
                </div>

                <button className="button" onClick={removeFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProducts
