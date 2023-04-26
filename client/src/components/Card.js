import moment from 'moment'
import React from 'react'

const Card = ({product}) => {
  return (
    <div className='bg-cyan-600 rounded-lg shadow-xl w-[700px] flex flex-col items-center justify-around h-[600px] text-white'>
      <div className='flex flex-row w-[80%] justify-center items-center'>
        <div className='border-r-4 border-r-white p-3  text-right w-[50%]'>Product Name</div>
        <div className='p-3  w-[50%]'>{product.product_name}</div>
      </div>
      <div className='flex flex-row w-[80%] justify-center items-center'>
        <div className='border-r-4 border-r-white p-3 w-[50%] text-right'>Product Description</div>
        <div className='p-3  w-[50%]'>{product.description}</div>
      </div>
      <div className='flex flex-row w-full justify-center items-center'>
        <div className='border-r-4 border-r-white p-3 text-right w-[50%]'>Product Manufacturer</div>
        <div className='p-3  w-[50%]'>{product.manufacturer}</div>
      </div>
      <div className='flex flex-row w-full justify-center items-center'>
        <div className='border-r-4 border-r-white p-3 text-right w-[50%]'>Date Arrived</div>
        <div className='p-3  w-[50%]'>{moment(product.date_arrived).format('MMMM Do YYYY')}</div>
      </div>
      <div className='flex flex-row w-full justify-center items-center'>
      <div className='border-r-4 border-r-white p-3 text-right w-[50%]'>Date Manufactured</div>
        <div className='p-3  w-[50%]'>{moment(product.date_manufactured).format('MMMM Do YYYY')}</div>
      </div>
      <div className='flex flex-row w-full justify-center items-center'>
        <div className='border-r-4 border-r-white p-3 text-right w-[50%]'>Expiration Date</div>
        <div className='p-3  w-[50%]'>{moment(product.expiration_Date).format('MMMM Do YYYY')}</div>
      </div>
      <div className='flex flex-row w-full justify-center items-center'>
        <div className='border-r-4 border-r-white p-3 text-right w-[50%]'>Active</div>
        <div className='p-3  w-[50%]'>{product.active.toString()}</div>
      </div>
      <div className='flex flex-row w-full justify-center items-center'>
        <div className='border-r-4 border-r-white p-3 text-right w-[50%]'>Ware House</div>
        <div className='p-3  w-[50%]'>{product.Warehouse.name}</div>
      </div>
    </div>
  )
}

export default Card
