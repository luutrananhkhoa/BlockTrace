import React, { useEffect, useState } from 'react'
import Button from '~/components/Button'
import styles from './Dry.module.scss'
import AddDry from '~/layouts/components/AddDry'
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"

const Dry = () => {
    const [isShow, setIsShow] = useState(false)
    const [listProduct, setListProducts] = useState([])

    const navigate = useNavigate()
    const address = useSelector((state)=>state.address)

    useEffect(()=>{
      getProcessingContract().then((contract) =>{
          contract.methods.getAllDry().call({
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
            <h1>Dry</h1>
            <div className={styles.buttonContainer}>
                {isShow?
                <Button
                onClick={()=>setIsShow(false)}>Cancel</Button>
                :
                <Button
                primary
                onClick={()=>setIsShow(true)}>Add dry</Button>
                }
                
            </div>
        </div>
        {isShow?
            <AddDry setIsShow={setIsShow} 
            // setIsShownQR={setIsShownQR}
            />
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
                        <th className={styles.userCategory}>
                            <h3>Address</h3>
                        </th>
                        <th className={styles.userCategory}>
                            <h3>Date</h3>
                        </th>
                    </tr>
                </thead>
                
                <tbody>
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

                            <td className={styles.userCategory}>
                                <p>{user.warehouseAddress}</p>
                            </td>
                            <td className={styles.userCategory}>
                                <p>{user.dryDate}</p>
                            </td>
                        </tr>
                    ) 
                })}
                </tbody>
            </table>
        </div>}
    </div>
  )
}

export default Dry