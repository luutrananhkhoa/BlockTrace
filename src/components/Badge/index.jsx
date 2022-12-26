import React from 'react'
import styles from './Badge.module.scss'
import clsx from 'clsx'

const Badge = ({completed, pending, notAvailable, title}) => {
    const classes = clsx(styles.wrapper,{
        [styles.completed]: completed,
        [styles.pending]: pending,
        [styles.notAvailable]: notAvailable
    })
    
  return (
    <span className={classes}>
        {title}
    </span>
  )
}

export default Badge