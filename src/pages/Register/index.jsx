import React from 'react'
import styles from './Register.module.scss'

import { useFormik } from 'formik';
import * as Yup from 'yup'
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import {getContract as getUserContract} from "~/contracts/userContract";
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '~/redux/slices/userSlice';

const Register = () => {
  let address = useSelector((state)=>state.address)
  const dispatch = useDispatch()


  const formik = useFormik({
    initialValues: {
      // address:"",
      username: "",
      userrole:""
    },
    validationSchema:Yup.object({
      // address: Yup.string('Require string').required('Required*'),
      username: Yup.string('Require string').required('Required*'),
      userrole: Yup.string('Require string').required('Required*')
    }),
    onSubmit: async (values)=>{
      console.log(values)
      console.log('hfgf',address.address)

      getUserContract().then((contract)=>{
        contract.methods.addUser(values.username, values.userrole)
        .send({from: address.address})
        .then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})
      })
    }
  })

  const onHandleConnect = async ()=>{

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts[0])
    const addressAccount = accounts[0];

    dispatch(saveAddress(addressAccount))

    // setTimeout(()=>{
    //   navigate('/')
    // },1000)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.section_left}>
        
      </div>
      <div className={styles.section_right}>
        <div className={styles.content}>
            <h2>Register</h2>
            <div className={styles.form}>
              {/* <div className={styles.inputContainer}>
                <label>Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}/>  
                <p>{formik.errors.address}</p>
              </div> */}
              <div className={styles.inputContainerMetamask}>
                <label>Address</label>
                <div className={styles.container}>
                  <input 
                      type="text"
                      name="username" 
                      disabled
                    />  
                  <div className={styles.buttonMetamask}>
                    <Button onClick={onHandleConnect}>Metamask</Button>
                  </div>
                </div>
                
              </div>
 
              <div className={styles.inputContainer}>
                <label>User Name</label>
                <input 
                  type="text"
                  name="username" 
                  value={formik.values.username}
                  onChange={formik.handleChange}/>  
                <p>{formik.errors.username}</p>
              </div>
              <div className={styles.inputContainer}>
                <label>User Role</label>
                <input 
                  type="text" 
                  name="userrole"
                  value={formik.values.userrole}
                  onChange={formik.handleChange}/>  
                <p>{formik.errors.userrole}</p>
              </div>

            </div>
            <div className={styles.buttonContainer}>
              <Button onClick={formik.handleSubmit}>Register</Button>
            </div>

            <p className={styles.linkSignup_title}>Already have an account?</p>
            <div className={styles.linkSignup}>
              <Link to='/login' className={styles.link}>Sign up</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register