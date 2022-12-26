import { faBars, faUser, faRightFromBracket, faBoxOpen, faTrainSubway, faTractor,
         faWarehouse, faBarcode, faBox} from '@fortawesome/free-solid-svg-icons'
// import {  } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import logo from '~/assets/images/Logo.png'

const Sidebar = () => {

  useEffect(()=>{
    let check = localStorage.getItem('userId')

    console.log('userId in Sidebar', check)
  },[])

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.menuList}>
          <NavLink to='/' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faBars} />
            <p>Dashboard</p>
          </NavLink>
          <NavLink to='/user' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faUser} />
            <p>User</p>
          </NavLink>
          <NavLink to='/farmer' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faTractor} />
            <p>Farmer</p>
          </NavLink>
          <NavLink to='/product' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faBoxOpen} />
            <p>Ingress</p>
          </NavLink>
          <NavLink to='/rough' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faBox} />
            <p>Rough</p>
          </NavLink>
          <NavLink to='/warehouse' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faWarehouse} />
            <p>Warehouse</p>
          </NavLink>
        </div>
        
      </div>
      <Link to='/login' onClick={()=>{localStorage.removeItem("isLogin")}} className={styles.logout}>
          <FontAwesomeIcon className={styles.menuIcon} icon={faRightFromBracket} />
          <p>Logout</p>
      </Link>
    </div>
  )
}

export default Sidebar