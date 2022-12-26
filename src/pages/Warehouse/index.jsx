import React from 'react'
import { useState } from 'react'
import Button from '~/components/Button'
import AddWarehouse from '~/layouts/components/AddWarehouse'
import styles from './Warehouse.module.scss'

const Warehouse = () => {

  const [isShow, setIsShow] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
          <h1>Warehouse</h1>
          <div className={styles.buttonContainer}>
            {isShow?
              <Button  onClick={()=>setIsShow(false)}>Cancel</Button>
            :
              <Button primary onClick={()=>setIsShow(true)}>New warehouse</Button>
            }
          </div>
      </div>
      <div className={styles.content}>
        {isShow && <AddWarehouse />}
      </div>
  </div>
  )
}

export default Warehouse