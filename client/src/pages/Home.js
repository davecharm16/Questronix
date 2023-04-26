import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { getAll, getInactive, getActive, getSorted } from '../utils/api';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Row } from '../components/Row';


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selection, setSelection] = useState('all');

  const getAllData = async ()=>{
    let getApi;
    switch (selection) {
      case 'all':
        getApi = getAll
        break;
      case 'sorted':
        getApi = getSorted
        break;
      case 'active':
        getApi = getActive
        break;
      case 'inactive':
        getApi = getInactive
        break;
    }
    axios.get(getApi)
    .then((res)=>{
      if(res.data.status == 'success'){
        setProducts(res.data.data);
        console.log(res.data.data)
        setIsLoading(false);
      }
    })
    .catch((e)=>{
      console.log('Error getting Data : ' + e);
    })
  }

  useEffect(() => {
    getAllData();
  }, [selection])


  const handleChange = (e) => {
    setSelection(e.target.value);
  };

  return (
    (isLoading)? 
      <>Loading</>
      :
      <div className='min-h-screen min-w-full text-center'>
          <h2 className='text-cyan-600 text-6xl font-bold uppercase'>Products List</h2>
          <div className='flex flex-row justify-around items-center p-10'>
            <Link to={'/create'} className='bg-cyan-500 px-8 py-3 text-white rounded-lg'>Create Product</Link>
            <Select
              value={selection}
              onChange={handleChange}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'sorted'}>Sorted</MenuItem>
              <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'inactive'}>Inactive</MenuItem>
            </Select>
          </div>
          {/* <table className='flex flex-col w-full items-center px-40 pb-5'> */}
          <table className='mx-auto'>
            <thead>
              <th>Product Name</th>
              <th> Description</th>
              <th>Unit Price</th>
              <th> Manufacturer</th>
              <th>Date Arrived</th>
              <th>Date Manufactured</th>
              <th>Expiration Date</th>
              <th>Active</th>
              <th>Warehouse</th>
              <th>Action</th>
              <th>Buttons</th>
              <th>Update</th>
            </thead>
            <tbody>
            {
              products.map((value, index)=>{
                return(
                  <Row product = {value} key={index}/>
                )
              })
            }
            </tbody>

          </table>
      </div>
  )
}

export default Home
