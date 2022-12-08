import React from 'react'
import Sidebar from '../components/Sidebar'
import styles from './DefaultLayout.module.scss'
const DefaultLayout = ({children}) => {
  return (
    <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
            {children}
        </div>
    </div>
  )
}

export default DefaultLayout