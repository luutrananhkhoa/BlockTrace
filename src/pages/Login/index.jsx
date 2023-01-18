import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '~/redux/slices/userSlice';
import { saveInfo } from '~/redux/slices/userInfoSlice';
import { login } from '~/redux/slices/authSlice';
import {getContract as getUserContract} from "~/contracts/userContract";

import styles from './Login.module.scss'
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import iconLogo from '~/assets/images/iconBlockTrace.png'
import Toast from '~/components/Toast/Toast';

const Login = () => {
  const navigate = useNavigate()
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
          
          let userInfo = {
            fullName:response.fullName,
            userCccd:response.userEmail,
            userEmail:response.userCccd,
            userId: response.userId,
            userIsChecked:response.userIsChecked
          }

          let { userId } = response
          console.log('userId', userId)

          dispatch(saveInfo(userInfo))
          localStorage.setItem('userId', userId)

          if(response.userIsChecked){
            // <Toast 
            // toastType="success"
            // toastTitle="This is a success message"
            // />
            navigate('/')
            localStorage.setItem("isLogin", true);
            dispatch(login(true))
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
        <div className={styles.icon}>
          <img src={iconLogo} alt="icon" />
        </div>
        <h2>BLOCKTRACE</h2>
      </div>
      <div className={styles.section_right}>
        <div className={styles.content}>
          <div className={styles.headerRegister}>
            <div onClick={() => navigate(-1)} className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faArrowLeft} />
              <p>Back</p>
            </div>
            <div onClick={() => navigate(-1)} className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faHouse} />
              <p>Home</p>
            </div>
          </div>
            <h2>Sign in</h2>
            <p>Hi there, welcome back to BlockTrace!</p>
            {!address.address && 
              <div className={styles.button_container}> 
                <Button violet onClick={onHandleConnect}>Connect to Metamask</Button>
              </div>
            }
            <div className={`${styles.button_container } ${styles.button_second}`}> 
              <Button primary onClick={onHandleLogin}>Sign in</Button>
            </div>

            <div className={styles.signUpContainer}>
                <p className={styles.linkSignup_title}>Not yet register?</p>
                <div className={styles.linkSignup}>
                  <Link to='/register' className={styles.link}>Create account</Link>
                </div>
              </div>

            {/* <div className={`${styles.button_container } ${styles.button_second}`}> 
              <Button primary ><Link to='/register'>Register</Link></Button>
            </div> */}
        </div>
      </div>
    </div>
  )
}

export default Login