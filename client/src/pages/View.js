import React, {useState, useEffect}from 'react'
import axios from 'axios';
import Card from '../components/Card';
import {useParams, Link} from 'react-router-dom';
import { getSpecific } from '../utils/api';

const View = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(undefined);
  const [loading, setIsLoading] = useState(true);

  const getProduct = (id) => {
    axios.get(`${getSpecific}/${id}`)
    .then((res)=>{
      if(res.data.status == 'success'){
        setProduct(res.data.data)
        setIsLoading(false)
      }
    })
    .catch((e)=>{
      console.log(e)
    })
  }
  useEffect(()=>{
    getProduct(id);
  }, [])
  return (
    (loading)
    ?
    <>Loading</>
    :
    <div className='min-h-screen min-w-full flex flex-col justify-center items-center'>
      <h1 className='font-bold uppercase text-cyan-700 text-5xl'>Product Details</h1>
      <Link to={'/'} className='bg-cyan-500 text-white px-2 py-2 rounded-sm m-2'>Back Home</Link>
      <Card product = {product}/>
    </div>
  )
}

export default View
