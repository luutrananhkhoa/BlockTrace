import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '~/components/Button'  
import AddFarmer from '~/layouts/components/AddFarmer'
import styles from './Farmer.module.scss'

import {getContractFarmer} from "~/contracts/farmerContract"

const Farmer = () => {
  const address = useSelector((state)=>state.address)
  const [listFarmers, setListFarmers] = useState([])
  const [isShow, setIsShow] = useState(false)

  useEffect(()=>{
    getContractFarmer().then((contract) =>{
        contract.methods.getAllFarmer().call({
          from: address.address
        })
        .then((response)=>{
          // console.log('response', response)
          setListFarmers(response)
        })
        .catch((err)=>{console.log(err);})
      })

  },[])

  return (
    <div className={styles.wrapper}>
       <div className={styles.title}>
          <h1>Farmers</h1>
          <div className={styles.buttonContainer}>
            {isShow?
              <Button onClick={()=>setIsShow(false)}>Cancel</Button>
            :
              <Button primary onClick={()=>setIsShow(true)}>New Farmer</Button>
            }
          </div>
      </div>
      <div className={styles.content}>
        {isShow ? 
        <AddFarmer />
      :
      <div className={styles.content}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.userItemHeader}>
                        <th className={styles.userName}>
                          <h3>ID</h3>
                        </th>
                        <th className={styles.userName}>
                          <h3>Farmer Name</h3>
                        </th>
                        <th className={styles.userName}>
                          <h3>Identity Number</h3>
                        </th>
                        <th className={styles.userName}>
                          <h3>Address</h3>
                        </th>
                        <th className={styles.userAddress}>
                          <h3>Email</h3>
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                { listFarmers.map((user,index)=>{
                    return(
                        <tr key={index}className={styles.userItem}>
                            <td className={styles.userName}>
                              <p>{user.farmerId}</p>
                            </td>
                            <td className={styles.userName}>
                              <p>{user.farmerName}</p>
                            </td>
                            <td className={styles.userName}>
                              <p>{user.farmerCccd}</p>
                            </td>
                            <td className={styles.userName}>
                              <p>{user.farmerAddress}</p>
                            </td>
                            <td className={styles.userAddress}>
                              <p>{user.farmerEmail}</p>
                            </td>
                        </tr>
                    ) 
                })}
                </tbody>
            </table>
        </div>
      }
      </div>
    </div>
  )
}

export default Farmer