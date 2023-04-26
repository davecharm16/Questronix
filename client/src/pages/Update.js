import React, {useState, useEffect} from 'react'
import { useParams, Link  } from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {MenuItem, Select } from '@mui/material';
import * as Yup from "yup";
import axios from 'axios';
import { updateProduct, getSpecific, updateProductDisable } from '../utils/api';
import moment from 'moment';

const Update = () => {
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

  const PostProductSchema = Yup.object().shape(
    {
      "product_name": Yup.string().required('Product Name Required'),
      "description": Yup.string().required('Product Description Required'),
      "unit_price": Yup.number().required('Unit Price Required'),
      "manufacturer": Yup.string().required('Manufacturer Price Required'),
      "date_arrived": Yup.date().required('Date Arrived Required'),
      "date_manufactured": Yup.date().required('Date Manufactured Required'),
      "expiration_date": Yup.date().required('Expiration Date Required'),
      "active": Yup.boolean().required('Date Arrived Required'),
      "WarehouseId": Yup.string().required('Warehouse Required')
    }
  );

  const submitData = (data)=>{
    axios.put(`${updateProduct}/${id}`, data)
    .then((response)=>{
      if(response.data.status == 'success'){
        alert('Successfully Updated a Product');
        // getProduct(id)
      }
    })
    .catch((e)=>{
      console.log('Error Creating Product : ' + e)
    })
  }
  return (
    (loading)? 
    <></>:

      <div className='min-h-screen min-w-full flex flex-col justify-center items-center'>
        <h1 className='font-bold uppercase text-cyan-700 text-5xl'>Update Product</h1>
        <Link to={'/'} className='bg-cyan-500 text-white px-2 py-2 rounded-sm m-2'>Back Home</Link>
        <Formik
          initialValues={
            {
              "product_name": product.product_name,
              "description": product.description,
              "unit_price": product.unit_price,
              "manufacturer": product.manufacturer,
              "date_arrived": moment(product.date_arrived).format('YYYY-MM-DD'),
              "date_manufactured": moment(product.date_manufactured).format('YYYY-MM-DD'),
              "expiration_date": moment(product.expiration_date).format('YYYY-MM-DD'),
              "active": product.active,
              "WarehouseId": product.WarehouseId
            }
          }
          validationSchema={PostProductSchema}
          onSubmit={(values, {resetForm}) => {
            // same shape as initial values
            submitData(values)
          }}
        >
          {
            props => (
          <Form className='flex flex-col w-[500px] justify-around bg-[#fafafa] p-5 py-10 m-5 rounded-xl shadow-lg'>
              <label>Product Name: </label>
              <ErrorMessage name='product_name' component='span'/>
              <Field id="product_name" name = "product_name" placeholder = "Name" autoComplete="off"
                className = 'p-2'
              />
              <label>Product Description: </label>
              <ErrorMessage name='description' component='span'/>
              <Field id="description" name = "description" placeholder = "Description" autoComplete="off"
                className = 'p-2'
              />
              <label>Unit Price: </label>
              <ErrorMessage name='unit_price' component='span'/>
              <Field id="unit_price" name = "unit_price" placeholder = "0.0" autoComplete="off" type="number"
                className = 'p-2' 
              />
              
              <label>Manufacturer: </label>
              <ErrorMessage name='manufacturer' component='span'/>
              <Field id="manufacturer" name = "manufacturer" placeholder = "Manufacturer Name" autoComplete="off" type="text"
                className = 'p-2'
              />

              <label>Date Arrived: </label>
              <ErrorMessage name='date_arrived' component='span'/>
              <Field id="date_arrived" name = "date_arrived" autoComplete="off" type="date"/>

              <label>Date Manufactured: </label>
              <ErrorMessage name='date_manufactured' component='span'/>
              <Field id="date_manufactured" name = "date_manufactured" autoComplete="off" type="date"/>
              <label>Expiration Date: </label>
              <ErrorMessage name='expiration_date' component='span'/>
              <Field id="expiration_date" name = "expiration_date" autoComplete="off" type="date"/>
              <label>Active</label>
              <Field type="checkbox" name="active" selected={props.values.active} className = 'self-start w-5 h-5'/>
              <ErrorMessage name='WarehouseId' component='span'/>
              <label>WareHouse</label>
              <Field name="WarehouseId">
                {({ field, form }) => (
                  <Select {...field}>
                    <MenuItem value="">Select an option</MenuItem>
                    <MenuItem value="1">WareHouse1</MenuItem>
                    <MenuItem value="2">WareHouse2</MenuItem>
                    <MenuItem value="3">WareHouse3</MenuItem>
                  </Select>
                )}
              </Field>
              <button type="submit" className='bg-green-500 text-white w-[150px] self-center px-3 py-2 mt-5 rounded-lg'>Submit</button>
          </Form>
          )
          }
        </Formik>
    </div>
  )
}

export default Update
