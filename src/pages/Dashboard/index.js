import React, { useContext, useState } from 'react'
import Modal from '~/layouts/components/Modal'
import styles from './Dashboard.module.scss'
import { Context } from '~/context/Context.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '~/redux/slices/userSlice';
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract";

const Dashboard = () => {
  // const { address, setAddress} = useContext(Context)
  const [isShown,setIsShown] = useState(false)

  const addressRedux = useSelector((state) => state.address)
  console.log('dsadsa',addressRedux);

  return (
    <div className={styles.wrapper}>
      {isShown && <Modal setIsShown={setIsShown}/>}
        <div className={styles.title}>
        <h1>Dashboard</h1>
        <button 
          className={styles.button_Add}
          onClick = {()=>setIsShown(true)}>+ Add</button>
       
      </div>
    </div>
  )
}

export default Dashboard