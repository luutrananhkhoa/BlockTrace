import React, { useEffect, useState } from 'react'
import styles from './TrackingMobile.module.scss'
import logo from '~/assets/images/NewLogo.svg'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import { useParams } from 'react-router-dom';

import { faArrowRightArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TrackingMobile = () => {
    let walletAddress = '0xc855d47A54743745a8D529176B0368fd5c1fd96D'
    let { productId } = useParams()

    const [listProduct, setListProducts] = useState([])
    const [listProductRough, setListProductsRough] = useState([])
    const [listProductSquash, setListProductsSquash] = useState([])
    const [listProductDry, setListProductsDry] = useState([])
    const [listProductPackage, setListProductsPackage] = useState([])

    useEffect(()=>{
        if(productId){
          console.log(productId)
  
          getProcessingContract().then((contract) =>{
            contract.methods.getAllIngress().call({
              from: walletAddress
            })
            .then((response)=>{
              setListProducts(response)
              console.log('listProduct', listProduct)
            })
            .catch((err)=>{console.log(err);})
          })
  
          getProcessingContract().then((contract) =>{
            contract.methods.getAllRough().call({
              from: walletAddress
            })
            .then((response)=>{
              setListProductsRough(response)
              console.log('listProductRough', listProductRough)
            })
            .catch((err)=>{console.log(err);})
          })
  
          getProcessingContract().then((contract) =>{
            contract.methods.getAllSquash().call({
              from: walletAddress
            })
            .then((response)=>{
              if(response){
                setListProductsSquash(response)
              }
             
              console.log('listProductRough', listProductRough)
            })
            .catch((err)=>{console.log(err);})
          })
  
          getProcessingContract().then((contract) =>{
            contract.methods.getAllDry().call({
              from: walletAddress
            })
            .then((response)=>{
              if(response){
                setListProductsDry(response)
              }
             
              console.log('listProductRough', listProductRough)
            })
            .catch((err)=>{console.log(err);})
          })
  
          getProcessingContract().then((contract) =>{
            contract.methods.getAllPackage().call({
              from: walletAddress
            })
            .then((response)=>{
              if(response){
                setListProductsPackage(response)
              }
             
              console.log('listProductRough', listProductRough)
            })
            .catch((err)=>{console.log(err);})
          })
        }
  
        
      },[])
  return (
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <img src={logo} alt="" />
        </div>
        <div className={styles.title}>
            <h1>Tracking Information</h1>
        </div>
        <div className={styles.firstSection}>
            <div className={styles.Tracking}>
                <p>Tracking number</p>
                <span>{productId}</span>
            </div>      
            <div className={styles.Location}>
                <div className={styles.Location_From}>
                    <img src="https://cdn.countryflags.com/thumbs/vietnam/flag-round-250.png" alt="" />
                    {listProduct.map((item  ) =>{
                        return ( item.batchId === productId && <span>{item.ingressAddress.includes("Tỉnh")?
                                    item.ingressAddress.split("Tỉnh")[1] : item.ingressAddress.includes("Thành phố")?
                                    item.ingressAddress.split("Thành phố")[1] : item.ingressAddress}</span>
                                )})}
                </div>
                <div className={styles.Location_Icon}>
                    <FontAwesomeIcon className={styles.Icon} icon={faArrowRightArrowLeft} />
                </div>
                <div className={styles.Location_From}>
                    <img src="https://cdn.countryflags.com/thumbs/vietnam/flag-round-250.png" alt="" />
                    {listProductPackage.map((item) =>{
                        return ( item.batchId === productId && <span>{item.warehouseAddress.includes("Tỉnh")?
                                    item.warehouseAddress.split("Tỉnh")[1] : item.warehouseAddress.includes("Thành phố")?
                                    item.warehouseAddress.split("Thành phố")[1] : item.warehouseAddress}</span>
                                )})}
                </div>
            </div>    
        </div>
        <div className={styles.secondTitle}>
            <h1>Status</h1>
            <p>Detail</p>
        </div>
        
        {listProduct.map((item, index) =>{
            return ( item.batchId === productId && 
                <div className={styles.sectionInfo}>
                    <div className={styles.sectionInfo_detail}>
                        <div className={styles.sectionInfo_detail__title}>
                            <FontAwesomeIcon className={styles.Icon} icon={faArrowRightArrowLeft} />
                            <p className={styles.title}>Step 1</p>
                            <p className={styles.date}>{item.ingressDate}</p>
                        </div>
                        <div className={styles.sectionInfo_detail__body}>
                            <div className={styles.content_item}>
                                <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                                <p>{item.userName}</p>
                            </div>
                            <div className={styles.content_item}>
                                <h6>Identification Farmer: </h6>
                                <p>{item.farmerCccd}</p>
                            </div>
                            <div className={styles.content_item}>
                                <h6>Address: </h6>
                                <p>{item.ingressAddress}</p>
                            </div>
                            {/* <div className={styles.content_item}>
                                <h6>Contract: </h6>
                                <a href={item.contractPhoto} target="_blank">{item.contractPhoto?item.contractPhoto:''}</a>
                            </div> */}
                        </div>
                    </div>
                </div>)
            })}

        {listProductRough.map((item, index) =>{
            return ( item.batchId === productId && 
                <div className={styles.sectionInfo}>
                    <div className={styles.sectionInfo_detail}>
                        <div className={styles.sectionInfo_detail__title}>
                            <FontAwesomeIcon className={styles.Icon} icon={faArrowRightArrowLeft} />
                            <p className={styles.title}>Step 2</p>
                            <p className={styles.date}>{item.roughDate}</p>
                        </div>
                        <div className={styles.sectionInfo_detail__body}>
                            <div className={styles.content_item}>
                                <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                                <p>{item.userName}</p>
                            </div>
                            <div className={styles.content_item}>
                                <h6>Address: </h6>
                                <p>{item.warehouseAdress}</p>
                            </div>
                            {/* <div className={styles.content_item}>
                                <h6>Contract: </h6>
                                <a href={item.contractPhoto} target="_blank">{item.contractPhoto?item.contractPhoto:''}</a>
                            </div> */}
                        </div>
                    </div>
                </div>)
            })}

        {listProductSquash.map((item, index) =>{
            return ( item.batchId === productId && 
                <div className={styles.sectionInfo}>
                    <div className={styles.sectionInfo_detail}>
                        <div className={styles.sectionInfo_detail__title}>
                            <FontAwesomeIcon className={styles.Icon} icon={faArrowRightArrowLeft} />
                            <p className={styles.title}>Step 3</p>
                            <p className={styles.date}>{item.squashDate}</p>
                        </div>
                        <div className={styles.sectionInfo_detail__body}>
                            <div className={styles.content_item}>
                                <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                                <p>{item.userName}</p>
                            </div>
                            <div className={styles.content_item}>
                                <h6>Address: </h6>
                                <p>{item.warehouseAddress}</p>
                            </div>
                            {/* <div className={styles.content_item}>
                                <h6>Contract: </h6>
                                <a href={item.contractPhoto} target="_blank">{item.contractPhoto?item.contractPhoto:''}</a>
                            </div> */}
                        </div>
                    </div>
                </div>)
            })}

        {listProductDry.map((item, index) =>{
            return ( item.batchId === productId && 
                <div className={styles.sectionInfo}>
                    <div className={styles.sectionInfo_detail}>
                        <div className={styles.sectionInfo_detail__title}>
                            <FontAwesomeIcon className={styles.Icon} icon={faArrowRightArrowLeft} />
                            <p className={styles.title}>Step 4</p>
                            <p className={styles.date}>{item.dryDate}</p>
                        </div>
                        <div className={styles.sectionInfo_detail__body}>
                            <div className={styles.content_item}>
                                <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                                <p>{item.userName}</p>
                            </div>
                            <div className={styles.content_item}>
                                <h6>Address: </h6>
                                <p>{item.warehouseAddress}</p>
                            </div>
                            {/* <div className={styles.content_item}>
                                <h6>Contract: </h6>
                                <a href={item.contractPhoto} target="_blank">{item.contractPhoto?item.contractPhoto:''}</a>
                            </div> */}
                        </div>
                    </div>
                </div>)
            })}

        {listProductPackage.map((item, index) =>{
            return ( item.batchId === productId && 
                <div className={styles.sectionInfo}>
                    <div className={styles.sectionInfo_detail}>
                        <div className={styles.sectionInfo_detail__title}>
                            <FontAwesomeIcon className={styles.Icon} icon={faArrowRightArrowLeft} />
                            <p className={styles.title}>Step 5</p>
                            <p className={styles.date}>{item.packageDate}</p>
                        </div>
                        <div className={styles.sectionInfo_detail__body}>
                            <div className={styles.content_item}>
                                <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                                <p>{item.userName}</p>
                            </div>
                            <div className={styles.content_item}>
                                <h6>Address: </h6>
                                <p>{item.warehouseAddress}</p>
                            </div>
                            {/* <div className={styles.content_item}>
                                <h6>Contract: </h6>
                                <a href={item.contractPhoto} target="_blank">{item.contractPhoto?item.contractPhoto:''}</a>
                            </div> */}
                        </div>
                    </div>
                </div>)
            })}

        <div className={styles.footer}>
            
        </div>
    </div>
  )
}

export default TrackingMobile 