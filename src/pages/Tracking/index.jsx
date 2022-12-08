import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './Tracking.module.scss'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
const Tracking = () => {

    let address = useSelector((state)=>state.address)

    const [listProduct, setListProducts] = useState([])

    useEffect(()=>{
        getProcessingContract().then((contract) =>{
            contract.methods.getAllIngress().call({
              from: address.address
            })
            .then((response)=>{
              console.log('response', response)
              setListProducts(response)
            })
            .catch((err)=>{console.log(err);})
          })
    },[])

  return (
    <div className={styles.wrapper}>
        <div className={styles.title}>
            <h1>Tracking</h1>
        </div>
        <div className={styles.content}>
            <input type="text" placeholder="Id..."/>
        </div>
        {/* <div>
            { listProduct.map((user,index)=>{
                    return(
                        <div key={index} className={styles.userItem}>
                            <div className={styles.userName}>
                                <p>{user.fullName}</p>
                            </div>
                            <div className={styles.userAddress}>
                                <p>{user.userAddress}</p>
                            </div>
                            <div className={styles.userCategory}>
                                <p>{user.userCatergory}</p>
                            </div>
                            <div className={styles.userCategory}>
                                <p>{user.userIsChecked==true?'true':'false'}</p>
                            </div>
                        </div>
                    ) 
                        
                })}
        </div> */}
    </div>
  )
}

export default Tracking