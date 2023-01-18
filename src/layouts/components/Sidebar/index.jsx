import { faBars, faUser, faRightFromBracket, faBoxOpen, faTrainSubway, faTractor,
         faWarehouse, faBarcode, faBox, faBoxesPacking, faHandsWash, faSmog, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
// import {  } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import logo from '~/assets/images/Logo.png'
import clsx from 'clsx';

const Sidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  let userInfo = useSelector((state)=>state.userInfo)

  // let mini = true;
  const toggleSidebar =()=>{
    // setIsOpenSidebar(!isOpenSidebar)
    isOpenSidebar === true? setIsOpenSidebar(false): setIsOpenSidebar(true)

    // if (isOpenSidebar) {
    //   document.getElementById("mySidebar").style.width = "280px";
    //   // mini = false; 
    // } else {
    //   document.getElementById("mySidebar").style.width = "72px";
    //   // mini = true;
    // }
  }
  // const [sidebarHide, setSideBarHide] = useState(false);

  // const handleViewSidebar = () => {
  //   setSideBarHide(!sidebarHide);
  //   console.log('1')
  // };
  // useEffect(()=>{
  //   // let check = localStorage.getItem('userId')

  //   console.log('userInfo', userInfo)

  // },[])

  const classes = clsx(styles.wrapper, {
    [styles.wrapperSmall]: isOpenSidebar
  })

  return (
    <div className={classes}>
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="" />
        </div>
        {!isOpenSidebar?
         <FontAwesomeIcon onClick={toggleSidebar} className={styles.IconSidebar} icon={faArrowLeft} />
        :
        <FontAwesomeIcon onClick={toggleSidebar} className={styles.IconSidebar} icon={faArrowRight} />}
       

        {userInfo.userId=='0' &&
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
            <NavLink to='/warehouse' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faWarehouse} />
              <p>Warehouse</p>
            </NavLink>
          </div>
        }

        {userInfo.userId==='1' &&
          <div className={styles.menuList}>
            <NavLink to='/' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/product' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faBoxOpen} />
              <p>Ingress</p>
            </NavLink>
          </div>
        }
         
        {userInfo.userId==='2' &&
          <div className={styles.menuList}>
            <NavLink to='/' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/rough' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faBox} />
              <p>Rough</p>
            </NavLink>
          </div>
        }

        {userInfo.userId==='3' &&
          <div className={styles.menuList}>
            <NavLink to='/' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/squash' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faHandsWash} />
              <p>Squash</p>
            </NavLink>
          </div>
        }

        {userInfo.userId==='4' &&
          <div className={styles.menuList}>
            <NavLink to='/' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/dry' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faSmog} />
              <p>Dry</p>
            </NavLink>
          </div>
        }
        
        {userInfo.userId==='5' &&
          <div className={styles.menuList}>
            <NavLink to='/' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faBars} />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to='/package' className={styles.menuItem}>
              <FontAwesomeIcon className={styles.menuIcon} icon={faBoxesPacking} />
              <p>Package</p>
            </NavLink>
          </div>
        }
      </div>
      <Link to='/login' onClick={()=>{localStorage.removeItem("isLogin")}} className={styles.logout}>
          <FontAwesomeIcon className={styles.menuIcon} icon={faRightFromBracket} />
          <p>Logout</p>
      </Link>
    </div>
  )
}

export default Sidebar