'use client'
import React from 'react'
import Image from 'next/image'

function Copyright() {
  return (
    <>
    <hr />
      <div className="text-center bg-white p-2 hidden md:flex justify-center items-center">
            <p className='text-sm font-bold'>Copyright © 2017 || Designed By Prwebtechno || </p> 
            <Image className='ml-3'  width="400" height="400" src="/payment.png" alt="all_payment_accepted" />                
          </div>


          <div className="md:hidden md:mt-8 text-center bg-gradient-to-t from-red-100 to-slate-300 p-2">
            <p className="text-sm mb-2">Copyright © 2017 || Designed By Prwebtechno || </p>
            <div className="flex justify-center items-center">
              <Image
                className="ml-3"
                src="/payment.png"
                alt="all_payment_accepted"
                width={350}
                height={350}
              />
            </div>
          </div>
    </>
  )
}

export default Copyright