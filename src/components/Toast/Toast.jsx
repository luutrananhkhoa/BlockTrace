import React, { useState, useEffect } from 'react';
import styles from './Toast.module.scss'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Toast = (props) => {
    const { toastType, toastTitle } = props;
    const [status, setStatus] = useState(true);
    let toastProperties;

    switch(toastType) {
        case 'success':
            toastProperties = {
                title: 'Success',
                description: toastTitle,
                backgroundColor: '#5cb85c',
            }
            break;
        case 'danger':
            toastProperties = {
                title: 'Danger',
                description: toastTitle,
                backgroundColor: '#d9534f',
            }
            break;
        case 'info':
            toastProperties = {
                title: 'Info',
                description: toastTitle,
                backgroundColor: '#5bc0de',
            }
            break;
        case 'warning':
            toastProperties = {
                title: 'Warning',
                description: toastTitle,
                backgroundColor: '#f0ad4e',
            }
            break;
        default:
            break;
    }

    // setTimeout(() => {
    //     setStatus(false)
    //   }, 2000)

  return (
    <>
    {status &&<div className={styles.container}>
            <div 
                className={styles.position} 
                style={{ backgroundColor: toastProperties.backgroundColor }}
            >            
                <div className={styles.content}>
                    <p className={styles.content_title}>{toastProperties.title}</p>
                    <p className={styles.content_msg}>{toastProperties.description}</p>
                </div>
                <button className={styles.buttonClose} onClick={()=>{setStatus(false)}}>
                    <FontAwesomeIcon className={toastProperties.closeIcon} icon={faXmark} />
                </button>
            </div>
        </div>}
        
  
    </>
  )
}

export default Toast