import React from 'react'
import styles from './NotFound.module.scss'
import Button from '~/components/Button'
import HeaderTracking from '~/layouts/components/HeaderTracking'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.wrapper}>
      <HeaderTracking/>
      <div className={styles.section}>
        <div className={styles.content}>
          <h1>404</h1>
          <p>PAGE NOT FOUND</p>
          <Button primary onClick={()=>navigate('/')}>GO HOME</Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound