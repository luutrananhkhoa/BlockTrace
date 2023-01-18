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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Package } from '~/pages/Package';

const Tracking = () => {

    let address = useSelector((state)=>state.address)

    const [listProduct, setListProducts] = useState([])
    const [listProductRough, setListProductsRough] = useState([])
    const [listProductSquash, setListProductsSquash] = useState([])
    const [listProductDry, setListProductsDry] = useState([])
    const [listProductPackage, setListProductsPackage] = useState([])

    let { productId } = useParams();

    const generatePdf = () =>{
      let doc = new jsPDF("p","pt", "a4")
      doc.html(document.querySelector("#contentPDF"),
      {
        callback: function(pdf) {
          pdf.save("tracking.pdf")
        }
      })
    //   html2canvas(document.querySelector("#contentPDF")).then(canvas => {
        
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, 'PNG', 0, 0);
    //     pdf.save("tracking.pdf"); 
    // });
    }

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

        getProcessingContract().then((contract) =>{
          contract.methods.getAllSquash().call({
            from: address.address
          })
          .then((response)=>{
            console.log('response 3', response)
            if(response){
              setListProductsSquash(response)
            }
           
            console.log('listProductRough', listProductRough)
          })
          .catch((err)=>{console.log(err);})
        })

        getProcessingContract().then((contract) =>{
          contract.methods.getAllDry().call({
            from: address.address
          })
          .then((response)=>{
            console.log('response 4', response)
            if(response){
              setListProductsDry(response)
            }
           
            console.log('listProductRough', listProductRough)
          })
          .catch((err)=>{console.log(err);})
        })

        getProcessingContract().then((contract) =>{
          contract.methods.getAllPackage().call({
            from: address.address
          })
          .then((response)=>{
            console.log('response 5', response)
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
      <HeaderTracking />
        <div className={styles.title}>
            <h1>Tracking</h1>
            <Button onClick={generatePdf}>Print</Button>
        </div>
        {/* <div className={styles.input}>
            <input type="text" placeholder="Id..."/>
        </div> */}
        
        <div id="contentPDF" className={styles.section}>
        {listProduct.map((item, index) =>{
            return ( item.batchId === productId
               &&
               <>
                <div className={styles.section}>
                  <FontAwesomeIcon className={styles.iconCheck} icon={faCheck}/>
                </div>
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
                    <a href={item.contractPhoto} target="_blank">{item.contractPhoto?item.contractPhoto:''}</a>
                  </div>
                </div>
               </>
              
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
      
        <div className={styles.section}>
        {listProductRough.map((item, index) =>{
          if( item.warehouseAddress!==''){
            return ( item.batchId === productId
              &&
              <>
               <div className={styles.section}>
                 <FontAwesomeIcon className={styles.iconCheck} icon={faCheck}/>
               </div>
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
                   <p>{item.warehouseAddress}</p>
                 </div>
                 <div className={styles.content_info}>
                   <h6>Contract: </h6>
                   <p>{item.processPhoto?item.processPhoto:'https://cloudflare-ipfs.com/ipfs/Logo.png'}</p>
                 </div>
               </div>
              </>
            ) 
          }
            
        })}
        </div>
        <div className={styles.section}>
          {listProductSquash.map((item, index) =>{
            if(item.squashDate!==''){
              return ( item.batchId === productId
                &&
                <>
                 <div className={styles.section}>
                   <FontAwesomeIcon className={styles.iconCheck} icon={faCheck}/>
                 </div>
                 <div key={index} className={styles.content}>
                   <h4>Squash</h4>
                   <div className={styles.content_role}>
                     <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                     <p>{item.userName}</p>
                   </div>
                   <div className={styles.content_time}>
                     <FontAwesomeIcon className={styles.Icon} icon={faClock} />
                     <p>{item.squashDate}</p>
                   </div>
                   <div className={styles.content_info}>
                     <h6>BatchId: </h6>
                     <p>{item.batchId}</p>
                   </div>
                   <div className={styles.content_info}>
                     <h6>Address: </h6>
                     <p>{item.warehouseAddress}</p>
                   </div>
                   <div className={styles.content_info}>
                     <h6>Contract: </h6>
                     <p>{item.processPhoto?item.processPhoto:'https://cloudflare-ipfs.com/ipfs/Logo.png'}</p>
                   </div>
                 </div>
                </>
               ) 
            }
          })}
        </div>
        <div className={styles.section}>
          {listProductDry.map((item, index) =>{
           return ( item.batchId === productId
            &&
            <>
             <div className={styles.section}>
               <FontAwesomeIcon className={styles.iconCheck} icon={faCheck}/>
             </div>
             <div key={index} className={styles.content}>
               <h4>Dry</h4>
               <div className={styles.content_role}>
                 <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                 <p>{item.userName}</p>
               </div>
               <div className={styles.content_time}>
                 <FontAwesomeIcon className={styles.Icon} icon={faClock} />
                 <p>{item.dryDate}</p>
               </div>
               <div className={styles.content_info}>
                 <h6>BatchId: </h6>
                 <p>{item.batchId}</p>
               </div>
               <div className={styles.content_info}>
                 <h6>Address: </h6>
                 <p>{item.warehouseAddress}</p>
               </div>
               <div className={styles.content_info}>
                 <h6>Contract: </h6>
                 <p>{item.processPhoto?item.processPhoto:'https://cloudflare-ipfs.com/ipfs/Logo.png'}</p>
               </div>
             </div>
            </>
           ) 
          })}
        </div>

        <div className={styles.section}>
          {listProductPackage.map((item, index) =>{
            if(item.packageDate!==''){
              return ( item.batchId === productId && item.userName!==''
                &&
                <>
                 <div className={styles.section}>
                   <FontAwesomeIcon className={styles.iconCheck} icon={faCheck}/>
                 </div>
                 <div key={index} className={styles.content}>
                   <h4>Package</h4>
                   <div className={styles.content_role}>
                     <FontAwesomeIcon className={styles.Icon} icon={faUser} />
                     <p>{item.userName}</p>
                   </div>
                   <div className={styles.content_time}>
                     <FontAwesomeIcon className={styles.Icon} icon={faClock} />
                     <p>{item.packageDate}</p>
                   </div>
                   <div className={styles.content_info}>
                     <h6>BatchId: </h6>
                     <p>{item.batchId}</p>
                   </div>
                   <div className={styles.content_info}>
                     <h6>Address: </h6>
                     <p>{item.warehouseAddress}</p>
                   </div>
                   <div className={styles.content_info}>
                     <h6>Contract: </h6>
                     <p>{item.processPhoto?item.processPhoto:'https://cloudflare-ipfs.com/ipfs/Logo.png'}</p>
                   </div>
                 </div>
                </>
               ) 
            }
          })}
        </div>
    </div>
  )
}

export default Tracking