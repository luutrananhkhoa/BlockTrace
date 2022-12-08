import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './Products.module.scss'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
const Products = () => {

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
            <h1>Products</h1>
        </div>
        <div className={styles.content}>
            <div className={styles.table}>
                <div className={styles.userItemHeader}>
                    <div className={styles.userName}>
                        <h3>UserName</h3>
                    </div>
                    <div className={styles.userAddress}>
                        <h3>FarmerName</h3>
                    </div>
                    <div className={styles.userCategory}>
                        <h3>IngressAddress</h3>
                    </div>
                    <div className={styles.userCategory}>
                        <h3>IngressDate</h3>
                    </div>
                </div>
                { listProduct.map((user,index)=>{
                    return(
                        <div key={index} className={styles.userItem}>
                            <div className={styles.userName}>
                                <p>{user.userName}</p>
                            </div>
                            <div className={styles.userAddress}>
                                <p>{user.farmerName}</p>
                            </div>
                            <div className={styles.userCategory}>
                                <p>{user.ingressAddress}</p>
                            </div>
                            <div className={styles.userCategory}>
                                <p>{user.ingressDate}</p>
                            </div>
                        </div>
                    ) 
                        
                })}
            </div>
        </div>
    </div>
  )
}

export default Products