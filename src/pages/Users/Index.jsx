import React, { useEffect, useState } from 'react'
import styles from './Users.module.scss'
import { useSelector } from 'react-redux'
import {getContract as getUserContract} from "~/contracts/userContract"

const Users = () => {
    let address = useSelector((state)=>state.address)

    const [listUsers, setListUsers] = useState([])

    useEffect(()=>{
        getUserContract().then((contract) =>{
            contract.methods.getAllUser().call({
              from: address.address
            })
            .then((response)=>{
              console.log('response', response)
              setListUsers(response)
            })
            .catch((err)=>{console.log(err);})
          })
    },[])

  return (
    <div className={styles.wrapper}>
        <div className={styles.title}>
            <h1>Users</h1>
        </div>
        <div className={styles.content}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.userItemHeader}>
                        <th className={styles.userName}>
                            <h3>User Name</h3>
                        </th>
                        <th className={styles.userName}>
                            <h3>Metamask Wallet Address</h3>
                        </th>
                        <th className={styles.userAddress}>
                            <h3>Role</h3>
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                { listUsers.map((user,index)=>{
                    return(
                        <tr key={index} className={styles.userItem}>
                            <td className={styles.userName}>
                                <p>{user.fullName}</p>
                            </td>
                            <td className={styles.userName}>
                                <p>{user.userAddress}</p>
                            </td>
                            <td className={styles.userAddress}>
                                <p>{user.userCategory}</p>
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

export default Users