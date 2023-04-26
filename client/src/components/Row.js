import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

export const Row = ({product, deleteProduct, disableProduct}) => {
  return (
    <tr>
        <td>{product.product_name}</td>
        <td>{product.description}</td>
        <td>{product.unit_price}</td>
        <td>{product.manufacturer}</td>
        <td>{moment(product.date_arrived).format("MMM Do YYYY")}</td>
        <td>{moment(product.date_manufactured).format("MMM Do YYYY")}</td>
        <td>{moment(product.expiration_date).format("MMM Do YYYY")}</td>
        <td>{product.active.toString()}</td>
        <td>{product.Warehouse.name}</td>
        <td>
            <Link to={`/view/${product.product_id}`} className='bg-teal-500 text-white px-5 rounded-lg py-3'>View</Link>
        </td>
        <td>
            {(product.active) ? <div className='bg-red-700 text-white rounded-lg px-5 py-3 cursor-pointer' onClick={()=>disableProduct(product.product_id)}>Disable</div> : <div className='w-[100px]'></div>}
        </td>
        <td>
          <Link to={`/update/${product.product_id}`} className='bg-green-700 text-white rounded-lg px-5 py-3'>Update</Link>
        </td>
        <td>
          <div className='bg-red-700 text-white rounded-lg px-5 py-3 cursor-pointer' onClick={()=>{deleteProduct(product.product_id)}}>Delete</div> 
        </td>
    </tr>
  )
}
