import React, { useState } from 'react'
import Button from '~/components/Button'
import AddFarmer from '~/layouts/components/AddFarmer'
import styles from './Farmer.module.scss'

const Farmer = () => {
  const [isShow, setIsShow] = useState(false)

  return (
    <div className={styles.wrapper}>
       <div className={styles.title}>
          <h1>Farmers</h1>
          <div className={styles.buttonContainer}>
            {isShow?
              <Button onClick={()=>setIsShow(false)}>Cancel</Button>
            :
              <Button primary onClick={()=>setIsShow(true)}>New Farmer</Button>
            }
          </div>
      </div>
      <div className={styles.content}>
        {isShow && <AddFarmer />}
      </div>
    </div>
  )
}

export default Farmer