import React from 'react';

const Payment = () => {
    return (
        <div>
            <section class="bg-white py-8 antialiased md:py-16">
                <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div class="mx-auto max-w-5xl">
                        <h2 class="text-xl font-semibold text-gray-900  sm:text-2xl">Payment</h2>

                        <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                            <form action="#" class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm -700 -800 sm:p-6 lg:max-w-xl lg:p-8">
                                <div class="mb-6 grid grid-cols-2 gap-4">
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 "> Full name (as displayed on card)* </label>
                                        <input type="text" id="full_name" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Bonnie Green" required />
                                    </div>

                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="card-number-input" class="mb-2 block text-sm font-medium text-gray-900"> Card number* </label>
                                        <input type="text" id="card-number-input" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                    </div>

                                    <div>
                                        <label for="card-expiration-input" class="mb-2 block text-sm font-medium text-gray-900 ">Card expiration* </label>
                                        <div class="relative">
                                            <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                            </div>
                                            <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="12/23" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label for="cvv-input" class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 ">
                                            CVV*
                                            <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" class="text-gray-400 hover:text-gray-900">

                                            </button>
                                            <div id="cvv-desc" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300">
                                                The last 3 digits on back of card
                                                <div class="tooltip-arrow" data-popper-arrow></div>
                                            </div>
                                        </label>
                                        <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500" placeholder="•••" required />
                                    </div>
                                </div>

                                <button type="submit" class="flex w-full items-center justify-center rounded-lg bg-primaryColor px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300">Pay now</button>
                            </form>

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