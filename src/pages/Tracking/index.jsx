import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './Tracking.module.scss'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock, faCheck} from '@fortawesome/free-solid-svg-icons'
import HeaderTracking from '~/layouts/components/HeaderTracking';
import Button from '~/components/Button';
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";

const Tracking = () => {

    let address = useSelector((state)=>state.address)

    const [listProduct, setListProducts] = useState([])
    const [listProductRough, setListProductsRough] = useState([])

    let { productId } = useParams();

    useEffect(()=>{

      if(productId){
        console.log(productId)

        getProcessingContract().then((contract) =>{
          contract.methods.getAllIngress().call({
            from: address.address
          })
          .then((response)=>{
            console.log('response 1', response)
            setListProducts(response)
            console.log('listProduct', listProduct)
          })
          .catch((err)=>{console.log(err);})
        })

        getProcessingContract().then((contract) =>{
          contract.methods.getAllRough().call({
            from: address.address
          })
          .then((response)=>{
            console.log('response 2', response)
            setListProductsRough(response)
            console.log('listProductRough', listProductRough)
          })
          .catch((err)=>{console.log(err);})
        })
      }

    },[])

  return (
    <div className={styles.wrapper}>
      <HeaderTracking />
        <div className={styles.title}>
            <h1>Tracking</h1>
        </div>
        {/* <div className={styles.input}>
            <input type="text" placeholder="Id..."/>
        </div> */}
        
        <div className={styles.section}>
        {listProduct.map((item, index) =>{
            return ( item.batchId === productId
               &&
              <div key={index} className={styles.content}>
                <h4>Ingress</h4>
                <div className={styles.content_role}>
                  <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                  <p>{item.userName}</p>
                </div>
                <div className={styles.content_time}>
                  <FontAwesomeIcon className={styles.Icon} icon={faClock} />
                  <p>{item.ingressDate}</p>
                </div>
                <div className={styles.content_info}>
                  <h6>BatchId: </h6>
                  <p>{item.batchId}</p>
                </div>
                <div className={styles.content_info}>
                  <h6>Identity Farmer: </h6>
                  <p>{item.farmerCccd}</p>
                </div>
                <div className={styles.content_info}>
                  <h6>Address: </h6>
                  <p>{item.ingressAddress}</p>
                </div>
                <div className={styles.content_info}>
                  <h6>Contract: </h6>
                  <p>{item.contractPhoto?item.contractPhoto:'https://cloudflare-ipfs.com/ipfs/Logo.png'}</p>
                </div>
              </div>
            ) 
            
        })}
          
          {/* <div className={styles.content}>
            <h4>Ingress</h4>
            <div className={styles.content_role}>
              <FontAwesomeIcon className={styles.Icon} icon={faUser} />
              <p>Admin</p>
            </div>
            <div className={styles.content_time}>
              <FontAwesomeIcon className={styles.Icon} icon={faClock} />
              <p>16/12/2022 17:22:04</p>
            </div>
            <div className={styles.content_info}>
              <h6>Full Name: </h6>
              <p>Luu Tran Anh Khoa</p>
            </div>
            <div className={styles.content_info}>
              <h6>Farmer Name: </h6>
              <p>Phan Pham Quynh Hoa</p>
            </div>
            <div className={styles.content_info}>
              <h6>Address: </h6>
              <p>HCM</p>
            </div>
            <div className={styles.content_info}>
              <h6>Contract: </h6>
              <p>https://cloudflare-ipfs.com/ipfs/Logo.png</p>
            </div>
          </div> */}
        </div>
        {/* {listProductRough && 
          <div className={styles.section}>
          <FontAwesomeIcon className={styles.iconCheck} icon={faCheck}/>
        </div>} */}
      
        <div className={styles.section}>
        {listProductRough.map((item, index) =>{
            return ( item.batchId === productId
               &&
              <div key={index} className={styles.content}>
                <h4>Rough</h4>
                <div className={styles.content_role}>
                  <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                  <p>{item.userName}</p>
                </div>
                <div className={styles.content_time}>
                  <FontAwesomeIcon className={styles.Icon} icon={faClock} />
                  <p>{item.roughDate}</p>
                </div>
                <div className={styles.content_info}>
                  <h6>BatchId: </h6>
                  <p>{item.batchId}</p>
                </div>
                <div className={styles.content_info}>
                  <h6>Address: </h6>
                  <p>{item.roughAdress}</p>
                </div>
                <div className={styles.content_info}>
                  <h6>Contract: </h6>
                  <p>{item.processPhoto?item.processPhoto:'https://cloudflare-ipfs.com/ipfs/Logo.png'}</p>
                </div>
              </div>
            ) 
            
        })}
        </div>
    </div>
  )
}

export default Tracking