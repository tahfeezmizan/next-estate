import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VITE_Payment_PK } from '../../../constant';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import CheckOutFrom from './CheckOutFrom';

const stripePromise = loadStripe(`${VITE_Payment_PK}`);

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [property, setProperty] = useState([]);

    const price = property.map(item => item?.offeredAmound)

    useEffect(() => {
        axiosSecure.get(`/offerpay/${id}`)
            .then(res => {
                setProperty(res.data)
            })
    }, []);

    return (
        <div>
            <section class="bg-white py-8 antialiased md:py-16">
                <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div class="mx-auto max-w-5xl px-3 md:px-0">
                        <h2 class="text-xl font-semibold text-gray-900  sm:text-2xl">Payment</h2>

                        <div class="mt-6 sm:mt-8">
                            <div class="w-full  md:w-[580px] mb-6 grow sm:mb-8 lg:mb-10">
                                <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 -700 -800">
                                    <div class="space-y-2">
                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="text-base font-normal text-gray-500">Original price</dt>
                                            <dd class="text-base font-medium text-gray-900 ">${price}</dd>
                                        </dl>
                                    </div>

                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 -700">
                                        <dt class="text-base font-bold text-gray-900 ">Total</dt>
                                        <dd class="text-base font-bold text-gray-900 ">${price}</dd>
                                    </dl>
                                </div>
                            </div>

                            <Elements stripe={stripePromise}>
                                <CheckOutFrom property={property} id={id} />
                            </Elements>

                            <div class="w-full  md:w-[580px] mt-6 flex items-center justify-center gap-8">
                                <img class="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                                <img class="hidden h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                                <img class="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                <img class="hidden h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                                <img class="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                                <img class="hidden h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    );
};

export default Payment;