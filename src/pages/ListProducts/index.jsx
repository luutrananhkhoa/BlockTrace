import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './ListProducts.module.scss'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const ListProducts = () => {
    const navigate = useNavigate()
    let address = useSelector((state)=>state.address)

    const [listProduct, setListProducts] = useState([])
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")
    // const [isShownQR,setIsShownQR] = useState(false)

    const handleDownloadQRCode = (qrCodeDataUrl)=>{
        if (qrCodeDataUrl) {
          html2canvas(document.getElementById("qrcode-container")).then((canvas) => {
            canvas.toBlob((blob) => {
              saveAs(blob, "qrcode.png");
            });
          });
        }
    }

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
        {/* {isShownQR && <QR setIsShownQR={setIsShownQR}/>} */}
        <div className={styles.title}>
            <h1>All Products</h1>
        </div>
        <div className={styles.content}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.userItemHeader}>
                            <th className={styles.userName}>
                                <h3>Id</h3>
                            </th>
                            <th className={styles.userName}>
                                <h3>QR-Code</h3>
                            </th>
                            <th className={styles.userName}>
                                <h3>UserName</h3>
                            </th>
                            <th className={styles.userCategory}>
                                <h3>Address</h3>
                            </th>
                            <th className={styles.userCategory}>
                                <h3>Date</h3>
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {/* <tr className={styles.userItem}>
                            <td className={styles.userName}>
                                <p>Hsad</p>
                            </td>
                            <td className={styles.userAddress}>
                                <p>fdà</p>
                            </td>
                            <td className={styles.userCategory}>
                                <p>dsa</p>
                            </td>
                            <td className={styles.userCategory}>
                                <p>dsad</p>
                            </td>
                        </tr>
                        <tr className={styles.userItem}>
                            <td className={styles.userName}>
                                <p>Hsad</p>
                            </td>
                            <td className={styles.userAddress}>
                                <p>fdà</p>
                            </td>
                            <td className={styles.userCategory}>
                                <p>dsa</p>
                            </td>
                            <td className={styles.userCategory}>
                                <p>dsad</p>
                            </td>
                        </tr> */}
                    { listProduct.map((user,index)=>{
                        return(
                            <tr key={index}  className={styles.userItem}>
                                <td className={styles.userName}>
                                    <p>{user.batchId}</p>
                                </td>
                                <td id="qrcode-container" onClick={()=>(navigate(`/tracking/${user.batchId}`))}>   
                                    <QRCode
                                        size={64}
                                        // value={user.batchId}
                                        value={`http://localhost:3000/tracking/${user.batchId}`}
                                        />
                                </td>
                                <td className={styles.userName}>
                                    <p>{user.userName}</p>
                                </td>
                                <td className={styles.userCategory}>
                                    <p>{user.ingressAddress}</p>
                                </td>
                                <td className={styles.userCategory}>
                                    <p>{user.ingressDate}</p>
                                </td>
                                <td className={styles.download}>
                                    <FontAwesomeIcon 
                                        className={styles.iconHome} 
                                        icon={faDownload}
                                        onClick={()=>{
                                            let url = `http://localhost:3000/tracking/${user.batchId}`
                                            handleDownloadQRCode(url)
                                        }} />
                                </td>
                            </tr>
                        ) 
                            
                    })}
                    </tbody>
                    
                    
                </table>
            </div>
    </div>
  )
}

export default ListProducts