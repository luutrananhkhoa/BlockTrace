import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '~/redux/slices/userSlice';
import {getContract as getUserContract} from "~/contracts/userContract";

import styles from './Login.module.scss'
import Button from '~/components/Button';

const Login = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  let address = useSelector((state)=>state.address)

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

  const onHandleLogin = () =>{
    console.log('first', address.address)

    if(address.address){
      getUserContract().then((contract) =>{
        contract.methods.login().call({
          from: address.address
        })
        .then((response)=>{
          console.log('response', response)
  
          if(response.userIsChecked){
            navigate('/')
          }else{
            alert('Chưa đăng ký tài khoản')
          }
        })
        .catch((err)=>{console.log(err);})
      })  
    }else{
      alert('Chưa connect metamask')
    }
    
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.section_left}>
        
      </div>
      <div className={styles.section_right}>
        <div className={styles.content}>
            <h4>Log in.</h4>
            <h2>Welcome back!</h2>
            {!address.address && 
              <div className={styles.button_container}> 
                <Button primary onClick={onHandleConnect}>Connect to Metamask</Button>
              </div>
            }
            <div className={`${styles.button_container } ${styles.button_second}`}> 
              <Button onClick={onHandleLogin}>Login</Button>
            </div>
            <hr />
            <div className={`${styles.button_container } ${styles.button_second}`}> 
              <Button primary><Link to='/register'>Register</Link></Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login