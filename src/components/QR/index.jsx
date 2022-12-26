import React from 'react'
import styles from './QRCode.module.scss'
import QRCode from "react-qr-code";
import {useSelector } from 'react-redux';
import closeIcon from '~/assets/images/Close.svg'

const QR = ({setIsShownQR}) => {
    let qrCode = useSelector((state)=>state.qrCode)
    console.log('qrCode', qrCode.qr)

    const hideModalQRHandler = () =>{
      setIsShownQR(false)
    }
  return (
    <div className={styles.backdrop}>
         <div className={styles.modal}>
          <div className={styles.headerModal}>
            <h4>QRCode</h4>
              <div className={styles.closeIcon}> 
                  <div onClick={hideModalQRHandler} ><img src={closeIcon} alt="" /></div>
              </div>
          </div>
            <QRCode value={qrCode.qr}/>
         </div>
    </div>
  )
}

export default QR