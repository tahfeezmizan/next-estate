import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const CheckOutFrom = ({ property,  id }) => {
    const { user } = UseAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const propertyItem = property?.[0];
    const price = property?.[0]?.offeredAmound;

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    setClientSecret(res.data?.clientSecret);
                })
        }
    }, [axiosSecure, price])

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
        } else {
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            }
        });

        if (confirmError) {
            toast.error(confirmError.code)
            // setError(error.message)
        } else {

            if (paymentIntent.status === "succeeded") {
                toast.success('Payment sucess')
                setTransactionId(paymentIntent?.id);

                // save payemnt history in databese
                const payemntHistory = {
                    transactionId: paymentIntent?.id,
                    title: propertyItem?.title,
                    location: propertyItem?.location,
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                    soldPrice: propertyItem?.offeredAmound,
                    propertyId: propertyItem?._id,
                    agentname: propertyItem?.agentname,
                    agentemail: propertyItem?.agentemail,
                    paymentData: Date.now(),
                    status: 'pending',
                }

                const res = axiosSecure.post('/payments', payemntHistory)
                    .then(res => {
                    })



                // update property bought status update 
                axiosSecure.patch(`/offeredaccept/${id}`, {status: 'bought', transactionId: paymentIntent?.id})
                    .then((data) => {
                    })
                    .catch((error) => {
                        console.error("Error updating property status:", error);
                    });
            }
        }


    }

    return (
        <form onSubmit={handlePayment} class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm -700 -800 sm:p-6 lg:max-w-xl lg:p-8">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret}
                className='flex w-full my-4 items-center justify-center rounded-lg bg-primaryColor px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300'
            >
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {transactionId && <p className="text-green-500 pb-2 font-medium ">Your Transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckOutFrom;