import React from 'react'
import styles from './AddRough.module.scss'
import closeIcon from '~/assets/images/Close.svg'

const AddRough = () => {
  return (
    <div className={styles.backdrop}>
        <div className={styles.modal}>
        <div className={styles.headerModal}>
          <h4>Add Rough</h4>
            <div className={styles.closeIcon}> 
                <div onClick={hideModalHandler} ><img src={closeIcon} alt="" /></div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddRough