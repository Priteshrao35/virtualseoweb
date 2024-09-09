'use client'
import React, { useState } from 'react';

function Service_price() {
    const [isAnnual, setIsAnnual] = useState(false); // Initially set to false for Monthly view

    const handleToggleClick = () => {
        setIsAnnual(!isAnnual);
    };

    return (
        <div className="md:px-[22em] p-2">
            <p className='text-xl md:text-4xl text-black text-left mb-5 font-bold md:mt-20'>The Best Solutions for Our Clients</p>
            {/* Pricing toggle */}
            <div className=" max-w-[50rem] md:pl-20 md:mt-10 mb-8 lg:mb-16">
                <div className="relative flex w-full p-1 bg-white dark:bg-slate-900 rounded-full">
                    <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                        <span className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${isAnnual ? 'translate-x-full' : 'translate-x-0'}`}></span>
                    </span>
                    <button
                        className={`relative flex-1 text-xl font-bold h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${isAnnual ? 'text-slate-500 dark:text-slate-400' : 'text-white'}`}
                        onClick={handleToggleClick}
                        aria-pressed={!isAnnual}
                    >
                        Monthly
                    </button>
                    <button
                        className={`relative flex-1 text-xl font-bold h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${isAnnual ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}
                        onClick={handleToggleClick}
                        aria-pressed={isAnnual}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Pricing tabs */}
            <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
                {/* Pricing tab 1 */}
                {isAnnual ? null : (
                    <>
                        {/* Pricing card 1 */}
                        <div class="h-full">
                            <div class="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                                <div class="mb-5">
                                    <div class="text-slate-900 dark:text-slate-200 font-semibold mb-1 text-3xl">Basic Plan</div>
                                    <div class="inline-flex items-baseline mb-2">
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-3xl">$ 149 </span>
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-4xl" x-text="isAnnual ? '29' : '35'"></span>
                                        <span class="text-slate-500 font-medium">&nbsp;/Monthly</span>
                                    </div>

                                </div>

                                <div class="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                                <ul class="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>No. of Keywords - 15</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Website Speed Analysis</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Long Tail Keywords</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Content Optimization</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Keyword research & Maping</span>
                                    </li>

                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>User Experience Analysis</span>
                                    </li>
                                </ul>
                                <a class="w-full mt-5 inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="#0">
                                    Purchase Plan
                                </a>
                            </div>

                        </div>
                        {/* Pricing card 2 */}
                        <div className="h-full">
                            <div class="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                                <div class="mb-5">
                                    <div class="text-slate-900 dark:text-slate-200 font-semibold mb-1 text-3xl">Standard Plan</div>
                                    <div class="inline-flex items-baseline mb-2">
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-3xl">$ 249</span>
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-4xl" x-text="isAnnual ? '29' : '35'"></span>
                                        <span class="text-slate-500 font-medium">&nbsp;/Monthly</span>
                                    </div>

                                </div>
                                <div class="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                                <ul class="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>No. of Keywords - 30</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Website Speed Analysis</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Long Tail Keywords</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Content Optimization</span>
                                    </li>

                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Keyword research & Maping</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>User Experience Analysis</span>
                                    </li>
                                    <a class="w-full inline-flex mt-5 justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="#0">
                                        Purchase Plan
                                    </a>
                                </ul>
                            </div>
                        </div>
                        {/* Pricing card 3 */}
                        <div className="h-full">
                            <div class="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                                <div class="mb-5">
                                    <div class="text-slate-900 dark:text-slate-200 font-semibold mb-1 text-3xl">Premium Plan</div>
                                    <div class="inline-flex items-baseline mb-2">
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-3xl">$399</span>
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-4xl" x-text="isAnnual ? '29' : '35'"></span>
                                        <span class="text-slate-500 font-medium">&nbsp;/Monthly</span>
                                    </div>

                                </div>
                                <div class="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                                <ul class="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>No. of Keywords - 60</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Website Speed Analysis</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Long Tail Keywords</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Content Optimization</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Keyword research & Maping</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>User Experience Analysis</span>
                                    </li>
                                    <a class="w-full mt-5 inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="#0">
                                        Purchase Plan
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </>
                )}



                {/* Pricing tab 2 Yearly */}
                {isAnnual ? (
                    <>
                        {/* Pricing card 1 */}
                        <div className="h-full">
                            <div class="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                                <div class="mb-5">
                                    <div class="text-slate-900 dark:text-slate-200 font-semibold mb-1">Ultimate</div>
                                    <div class="inline-flex items-baseline mb-2">
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-3xl">$ 549</span>
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-4xl" x-text="isAnnual ? '29' : '35'"></span>
                                        <span class="text-slate-500 font-medium">&nbsp;/Monthly</span>
                                    </div>
                                    
                                </div>
                                <div class="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                                <ul class="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>No. of Keywords - 100</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Website Speed Analysis</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Long Tail Keywords</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Content Optimization</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Keyword research & Maping</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>User Experience Analysis</span>
                                    </li>
                                    <a class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="#0">
                                        Purchase Plan
                                    </a>
                                </ul>
                            </div>
                        </div>
                        {/* Pricing card 2 */}
                        <div className="h-full">
                            <div class="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                                <div class="mb-5">
                                    <div class="text-slate-900 dark:text-slate-200 font-semibold mb-1">Deluxe</div>
                                    <div class="inline-flex items-baseline mb-2">
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-3xl">$ 949</span>
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-4xl" x-text="isAnnual ? '29' : '35'"></span>
                                        <span class="text-slate-500 font-medium">&nbsp;/Monthly</span>
                                    </div>
\                                    
                                </div>
                                <div class="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                                <ul class="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>No. of Keywords - 200</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Website Speed Analysis</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Long Tail Keywords</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Content Optimization</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Keyword research & Maping</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>User Experience Analysis</span>
                                    </li>
                                    <a class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="#0">
                                        Purchase Plan
                                    </a>
                                </ul>
                            </div>
                        </div>
                        {/* Pricing card 3 */}
                        <div className="h-full">
                            <div class="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
                                <div class="mb-5">
                                    <div class="text-slate-900 dark:text-slate-200 font-semibold mb-1">Platinum</div>
                                    <div class="inline-flex items-baseline mb-2">
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-3xl">$ 1299</span>
                                        <span class="text-slate-900 dark:text-slate-200 font-bold text-4xl" x-text="isAnnual ? '29' : '35'"></span>
                                        <span class="text-slate-500 font-medium">&nbsp;/Monthly</span>
                                    </div>
                                    
                                </div>
                                <div class="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                                <ul class="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>No. of Keywords - 500</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Website Speed Analysis</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Long Tail Keywords</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Content Optimization</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>Keyword research & Maping</span>
                                    </li>
                                    <li class="flex items-center">
                                        <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                        </svg>
                                        <span>User Experience Analysis</span>
                                    </li>
                                    <a class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150" href="#0">
                                        Purchase Plan
                                    </a>
                                </ul>
                            </div>
                        </div>
                    </>
                ) : null}

            </div>
        </div>
    );
}

export default Service_price;
