import { Elements } from '@stripe/react-stripe-js';
import React from 'react';

// TODO: add publisheble key
const stripePromise = loadStripe('');
const Payment = () => {
    return (
        <div>
            <section class="bg-white py-8 antialiased md:py-16">
                <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div class="mx-auto max-w-5xl">
                        <h2 class="text-xl font-semibold text-gray-900  sm:text-2xl">Payment</h2>

                        <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>

                            <div class="mt-6 grow sm:mt-8 lg:mt-0">
                                <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 -700 -800">
                                    <div class="space-y-2">
                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="text-base font-normal text-gray-500">Original price</dt>
                                            <dd class="text-base font-medium text-gray-900 ">$6,592.00</dd>
                                        </dl>

                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="text-base font-normal text-gray-500">Savings</dt>
                                            <dd class="text-base font-medium text-green-500">-$299.00</dd>
                                        </dl>

                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="text-base font-normal text-gray-500">Store Pickup</dt>
                                            <dd class="text-base font-medium text-gray-900 ">$99</dd>
                                        </dl>

                                        <dl class="flex items-center justify-between gap-4">
                                            <dt class="text-base font-normal text-gray-500">Tax</dt>
                                            <dd class="text-base font-medium text-gray-900 ">$799</dd>
                                        </dl>
                                    </div>

                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 -700">
                                        <dt class="text-base font-bold text-gray-900 ">Total</dt>
                                        <dd class="text-base font-bold text-gray-900 ">$7,191.00</dd>
                                    </dl>
                                </div>

                                <div class="mt-6 flex items-center justify-center gap-8">
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
                </div>
            </section>
        </div>
    );
};

export default Payment;