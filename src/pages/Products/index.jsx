import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './Products.module.scss'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"
import Button from '~/components/Button';
import AddProduct from '~/layouts/components/AddProduct';
import QR from '~/components/QR';
import { useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";

const Products = () => {
    const navigate = useNavigate()
    let address = useSelector((state)=>state.address)

    const [listProduct, setListProducts] = useState([])
    const [isShow, setIsShow] = useState(false)
    const [isShownQR,setIsShownQR] = useState(false)


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
        {isShownQR && <QR setIsShownQR={setIsShownQR}/>}
        <div className={styles.title}>
            <h1>Ingress</h1>
            <div className={styles.buttonContainer}>
                {isShow?
                <Button
                onClick={()=>setIsShow(false)}>Cancel</Button>
                :
                <Button
                primary
                onClick={()=>setIsShow(true)}>Add product</Button>
                }
                
            </div>
        </div>
        {isShow?
            <AddProduct setIsShow={setIsShow} setIsShownQR={setIsShownQR}/>
            :   
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
                            <th className={styles.userAddress}>
                                <h3>Identity Farmer</h3>
                            </th>
                            <th className={styles.userCategory}>
                                <h3>IngressAddress</h3>
                            </th>
                            <th className={styles.userCategory}>
                                <h3>IngressDate</h3>
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
                            <tr key={index} onClick={()=>(navigate(`/tracking/${user.batchId}`))} className={styles.userItem}>
                                <td className={styles.userName}>
                                    <p>{user.batchId}</p>
                                </td>
                                <td>   
                                    <QRCode
                                        size={64}
                                        // value={user.batchId}
                                        value={`http://localhost:3000/tracking/${user.batchId}`}
                                        />
                                </td>
                                <td className={styles.userName}>
                                    <p>{user.userName}</p>
                                </td>
                                <td className={styles.userAddress}>
                                    <p>{user.farmerCccd}</p>
                                </td>
                                <td className={styles.userCategory}>
                                    <p>{user.ingressAddress}</p>
                                </td>
                                <td className={styles.userCategory}>
                                    <p>{user.ingressDate}</p>
                                </td>
                            </tr>
                        ) 
                            
                    })}
                    </tbody>
                    
                    
                </table>
            </div>
        }
      
    </div>
  )
}

export default Products