import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import Button from '~/components/Button'
import AddWarehouse from '~/layouts/components/AddWarehouse'
import styles from './Warehouse.module.scss'
import {getContractProcessing as getProcessingContract} from "~/contracts/processingContract"

const Warehouse = () => {

  const [isShow, setIsShow] = useState(false)
  const [listWarehouse, setListWarehouses] = useState([])
  const addressAccount = useSelector((state)=>state.address)

  useEffect(()=>{
    getProcessingContract().then((contract) =>{
      contract.methods.getAllWarehouse().call({
        from: addressAccount.address
      })
      .then((response)=>{
        setListWarehouses(response)
      })
      .catch((err)=>{console.log(err);})
    })

  }, [])
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
          <h1>Warehouse</h1>
          <div className={styles.buttonContainer}>
            {isShow?
              <Button  onClick={()=>setIsShow(false)}>Cancel</Button>
            :
              <Button primary onClick={()=>setIsShow(true)}>New warehouse</Button>
            }
          </div>
      </div>
      <div className={styles.content}>
        {isShow?
         <AddWarehouse setIsShow={setIsShow}/>
        :
        <div className={styles.content}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.userItemHeader}>
                            <th className={styles.userName}>
                                <h3>Id</h3>
                            </th>
                            <th className={styles.userName}>
                                <h3>Warehouse Name</h3>
                            </th>
                            <th className={styles.userAddress}>
                                <h3>Warehouse Address</h3>
                            </th>
                            <th className={styles.userCategory}>
                                <h3>Status</h3>
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    { listWarehouse.map((warehouse,index)=>{
                        return(
                            <tr key={index} className={styles.userItem}>
                                <td className={styles.userName}>
                                    <p>{warehouse.warehouseId}</p>
                                </td>
                              
                                <td className={styles.userName}>
                                    <p>{warehouse.warehouseName}</p>
                                </td>
                                <td className={styles.userAddress}>
                                    <p>{warehouse.warehouseAddress}</p>
                                </td>
                                <td className={styles.userCategory}>
                                    <p>{warehouse.warehouseIsChecked?"True":"False"}</p>
                                </td>
                            </tr>
                        ) 
                            
                    })}
                    </tbody>
                </table>
            </div>}
      </div>
  </div>
  )
}

export default Warehouse