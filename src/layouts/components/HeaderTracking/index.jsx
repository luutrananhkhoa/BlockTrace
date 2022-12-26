import React from 'react'
import styles from './HeaderTracking.module.scss'
import logo from '~/assets/images/Logo.png'
import Button from '~/components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'

const HeaderTracking = () => {
    const navigate = useNavigate()
    const checkLogin = localStorage.getItem("isLogin");
  return (
    <div className={styles.headerContainer}>
        <div className={styles.logo}>
            <img src={logo} alt="logo" />
        </div>

        {checkLogin?
          <Link to='/' className={styles.icon}>
            <FontAwesomeIcon className={styles.iconHome} icon={faHome} />
          </Link>
          :
          <div onClick={() => navigate('/login')} className={styles.buttonContainer}>
              <Button primary>Login</Button>
          </div>
          }

        
    </div>
  )
}

export default HeaderTracking