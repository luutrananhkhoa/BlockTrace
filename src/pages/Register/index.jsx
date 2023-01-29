import React, { useState } from 'react'
import styles from './Register.module.scss'
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Button from '~/components/Button';
import {getContract as getUserContract} from "~/contracts/userContract";
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '~/redux/slices/userSlice';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import iconLogo from '~/assets/images/iconBlockTrace.png'
import Package from './../Package/index';

const Register = () => {
  let address = useSelector((state)=>state.address)
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const [valuesEmail, setValuesEmail] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const formik = useFormik({
    initialValues: {
      // address:"",
      username: "",
      userrole:"",
      email: "",
      identification: "",
    },
    validationSchema:Yup.object({
      // address: Yup.string('Require string').required('Required*'),
      username: Yup.string('Require string').required('Required*'),
      userrole: Yup.string('').required('Required!'),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      identification: Yup.number()
        .min(10, "Must be 9 characters")
        .required("Requried!")
    }),
    onSubmit: async (values)=>{
      console.log(values)
      console.log('address',address.address)
      let valuesTemp = {
        user_name:values.username,
        user_email:values.email,
        message:"Xác nhận bạn đã đăng ký tài khoản",
      }
      setValuesEmail(valuesTemp)

      getUserContract().then((contract)=>{
        contract.methods.addUser(values.username, values.email, values.identification, values.userrole)
        .send({from: address.address})
        .then((res)=>{
          console.log(res)
          if(res.status){
            navigate("/login")

            emailjs.send('service_n1iynk4', 'template_0wgwajc', valuesEmail, 'McUIWs_FHXPZgmsAI')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
          }

        }).catch((err)=>{console.log(err)})
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
        <div className={styles.icon}>
          <img src={iconLogo} alt="icon" />
        </div>
        <h2>BLOCKTRACE</h2>
      </div>
      <div className={styles.section_right}>

        <div className={styles.content}>
          <div className={styles.headerRegister}>
            <NavLink to='/login' className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faArrowLeft} />
              <p>Back</p>
            </NavLink>
            <NavLink to='/'  className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faHouse} />
              <p>Home</p>
            </NavLink>
          </div>
            <h2>Create new account</h2>
            <p>Easily track accounts, transactions, and more</p>
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
                      name="address" 
                      placeholder='Address'
                      value={address.address?address.address:""}
                      disabled
                    />  
                  <div className={styles.buttonMetamask}>
                    <Button onClick={onHandleConnect}>Metamask</Button>
                  </div>
                </div>
                
              </div>
 
              <div className={styles.inputContainer}>
                <label>Full Name</label>
                <input 
                  type="text"
                  name="username" 
                  placeholder='Full Name'
                  value={formik.values.username}
                  onChange={formik.handleChange}/>  
                <p>{formik.errors.username}</p>
              </div>
              <div className={styles.inputContainer}>
                <label>Email</label>
                <input 
                  type="email2"
                  name="email" 
                  placeholder='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange}/>  
                <p>{formik.errors.email}</p>
              </div>
              <div className={styles.inputContainer}>
                <label>Identification</label>
                <input 
                  type="text"
                  name="identification" 
                  placeholder='Identification'
                  value={formik.values.identification}
                  onChange={formik.handleChange}/>  
                <p>{formik.errors.identification}</p>
              </div>
              {/* <div className={styles.inputContainer}>
                <label>User Role</label>
                <input 
                  type="text" 
                  name="userrole"
                  value={formik.values.userrole}
                  onChange={formik.handleChange}/>  
                <p>{formik.errors.userrole}</p>
              </div> */}
                <div className={styles.inputContainer}>
                  <label>User Role</label>
                  <select
                  name="userrole"
                  value={formik.values.userrole}
                  onChange={formik.handleChange}>
                     <option value="" label="Select a role">
                      Select a role
                    </option>
                    <option value="0" label="Admin">
                      Admin
                    </option>
                    <option value="1" label="Ingress">
                      Ingress
                    </option>
                    <option value="2" label="Rough">
                      Rough
                    </option>
                    <option value="3" label="Squash">
                      Squash
                    </option>
                    <option value="4" label="Dry">
                      Dry
                    </option>
                    <option value="5" label="Package">
                      Package
                    </option>
                  </select>
                  <p>{formik.errors.userrole}</p>
                </div>
            </div>
            <div className={styles.footerRegister}>
              <div className={styles.signUpContainer}>
                <p className={styles.linkSignup_title}>Already have an account?</p>
                <div className={styles.linkSignup}>
                  <Link to='/login' className={styles.link}> Sign up</Link>
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <Button primary onClick={formik.handleSubmit}>Register</Button>
              </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Register