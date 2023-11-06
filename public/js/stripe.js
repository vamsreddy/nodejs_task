/* eslint-disable */

import axios from 'axios';
const stripe = Stripe('pk_test_51O3Gr6SEDWgLfdYjXiiH9jJr0bEzNIsCZOYmh1epAMtNz1BgagpgBCM9i1sxX9gbjzK2JUeLfVHeHcBD778Ueayi004y8FXkEE');

export const bookCar = async carId => {
    try{
        const session = await axios(
            `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${carId}`);

        console.log(session);

        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    }catch(err){
        console.log(err);
        showAlert('error', err);
    }
}