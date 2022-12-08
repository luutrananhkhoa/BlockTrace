import { faBars, faUser, faRightFromBracket, faBoxOpen, faTrainSubway } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Sidebar.module.scss'

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <h2>LOGO</h2>
        </div>
        <div className={styles.menuList}>
          <Link to='/' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faBars} />
            <p>Dashboard</p>
          </Link>
          <Link to='/users' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faUser} />
            <p>Users</p>
          </Link>
          <Link to='/products' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faBoxOpen} />
            <p>Products</p>
          </Link>
          <Link to='/tracking' className={styles.menuItem}>
            <FontAwesomeIcon className={styles.menuIcon} icon={faTrainSubway} />
            <p>Tracking</p>
          </Link>
        </div>
        
      </div>
      <Link to='/login' className={styles.logout}>
          <FontAwesomeIcon className={styles.menuIcon} icon={faRightFromBracket} />
          <p>Logout</p>
      </Link>
    </div>
  )
}

export default Sidebar